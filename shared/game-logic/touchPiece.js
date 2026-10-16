import checkIfInChess from "./checkForChess.js";
import { possibleMovesByName, isPossibleField} from './figureMovePatterns.js';

export default function touchPiece(board, [touchedX, touchedY]) { //Wird ausgeführt, wenn eine Figur berüht wrid
    const figure = board[touchedY][touchedX]
    const { figureType, fieldType, figureColor } = figure
    if (fieldType === 'empty') return []
    return startCheckingMoves(figureType,board,[touchedX, touchedY],figure);
}

function startCheckingMoves(figureType,board,pos,figure) {
    if (figureType == "pawn") return calculatePawnMoves(board,pos,figure)
    //if (figureType == "king") checkForCastle(figure)
    const movePattern = possibleMovesByName[figureType]
    const fields = calculatePossibleMoves(movePattern, board, pos, figure)
    return fields
}

function calculatePawnMoves(board,pos,figure) {
    const dir = figure.figureColor === 'white' ? 1 : -1
    const straigtMoves = pawnStraightMoves(copy(board),pos,figure.notMoved,dir,figure.figureColor)
    const diagonalMovesLeft = pawnDiagonalMoves(copy(board),pos,dir,figure.figureColor,1)
    const diagonalMovesRight = pawnDiagonalMoves(copy(board),pos,dir,figure.figureColor,-1)
    return [...straigtMoves,...diagonalMovesLeft,...diagonalMovesRight]
}

function pawnDiagonalMoves(board, [x,y], dirY, color, dirX) {
    if(
        dirX + x < 0 
        || dirX + x > 7
        || board[dirY + y][dirX + x].figureColor === color
        || board[dirY + y][dirX + x].fieldType === 'empty'
        || checkIfInChess(color,changeFields(x,y,x + dirX, y + dirY,board))
    ) return []

    return [[x+dirX,y + dirY]]
}

function pawnStraightMoves(board,[x,y],notMoved,dir,color) {
    let moves = []
    if(board[y + dir][x].fieldType === 'figure') return moves
    changeFields(x,y,x,y+dir,board)
    const isCheck = checkIfInChess(color,board)
    if(isCheck && !notMoved) return moves
    if(!isCheck) moves.push([x,y + dir])
    if(notMoved) return [...moves,...pawnStraightMoves(board,[x,y+dir],false,dir,color)]
    return moves
}


function calculatePossibleMoves([moveDirections, moveLimiter], board, [startX, startY], figure) {
    const fields = []
    moveDirections.forEach(([dirX, dirY]) => {
        const boardCopy = copy(board)
        const probs = { startX, startY, dirX, dirY, moveLimiter, boardCopy, figure}
        const newFields = calculateFieldsByDirection(probs)
        fields.push(...newFields)
    })
    return fields
}

function calculateFieldsByDirection({ startX, startY, dirX, dirY, boardCopy, figure, moveLimiter}) {
    const fields = [];
    const { figureColor } = figure

    for (let steps = 1; isPossibleField(startX,startY,dirX,dirY,steps, moveLimiter); steps++) {
        const result = canPieceMoveToField(steps, startX, startY, dirX, dirY, boardCopy, figureColor)
        if(result.success) fields.push(result.move)
        if(result.endLoop) break
    }
    return fields
}

function canPieceMoveToField(steps, startX, startY, dirX, dirY, boardCopy, myFigureColor) {

    const posX = startX + (dirX * steps)
    const posY = startY + (dirY * steps)
    const oldX = posX - dirX
    const oldY = posY - dirY
    const currentField = boardCopy[posY][posX]
    const { fieldType, figureColor } = currentField

    if (fieldType === "figure" && figureColor === myFigureColor) return { endLoop: true }
    
    changeFields(oldX, oldY, posX, posY, boardCopy)
    const isInCheck = checkIfInChess(myFigureColor, boardCopy)
    
    if (fieldType === "figure") {
        return isInCheck ? { endLoop: true } : { endLoop: true, success:true, move:[posX,posY]}
    }

    return isInCheck ? { success: false } : { success: true, move: [posX,posY]}
}


function changeFields(x1, y1, x2, y2, boardCopy) {
    boardCopy[y2][x2] = boardCopy[y1][x1]
    boardCopy[y1][x1] = { fieldType: "empty", movableField: false, enPassentField: false }
    return boardCopy
}


function copy(object) {
    return JSON.parse(JSON.stringify(object));
}