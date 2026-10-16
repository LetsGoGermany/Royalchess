import { possibleMovesByName, isPossibleField, canPieceGiveCheckInTheory} from './figureMovePatterns.js';

export default function checkIfInChess(color,gameBoard) {

    const enemyColor = color === 'white' ? 'black' : 'white';

    const pieces = gameBoard.flatMap(field => field).filter(field => field.fieldType === 'figure' && field.figureColor === enemyColor)

    const king = gameBoard.flat().find(piece => piece.figureColor === color && piece.figureType === 'king');

    const sortedPieces = pieces.filter(piece => canPieceGiveCheck(piece,color,gameBoard,king))
    const isCheck = sortedPieces.some(piece => checkIfPieceGivesCheck(piece,color,gameBoard))

   return isCheck
}

function canPieceGiveCheck(piece,color,gameBoard,king) {
    const [kingX,kingY] = [...getFigurePosition(king,gameBoard) ]
    const [pieceX,pieceY] = [...getFigurePosition(piece,gameBoard)]
    const direction = color == "white" ? -1 : 1 
    return canPieceGiveCheckInTheory(piece.figureType,kingX,kingY,pieceX,pieceY,direction)
}

function checkIfPieceGivesCheck(piece,color,gameBoard) {
    const figureType = piece.figureType;
    if(figureType == "pawn") return givesPawnCheck(piece,color,gameBoard)
    const moves = possibleMovesByName[figureType]()

    return checkForCheckByDirection(moves,color,piece,gameBoard)
}

function givesPawnCheck(piece,color,gameBoard) {
    const oppositeColor = color === 'white' ? 'black' : 'white';
    const direction = oppositeColor === 'white' ? 1 : -1;

    const posX = getFigurePosition(piece,gameBoard)[0];
    const posY = getFigurePosition(piece,gameBoard)[1]+direction;

    const field1 = checkPawnCheckField(posX,posY,1,color, gameBoard)
    const field2 = checkPawnCheckField(posX,posY,-1,color, gameBoard)
    return field1 || field2
    
}

function checkPawnCheckField(posX,posY,dirX,color,gameBoard) {
    const newPosX = posX + dirX;
    if(newPosX < 0 || newPosX > 7) return false
    if(posY < 0 || posY > 7) return false
    const field = gameBoard[posY][newPosX]
    return field.fieldType === "figure" && field.figureType == "king" && field.figureColor == color
}

function checkForCheckByDirection(moves,color,piece,gameBoard) {
    return moves[0].some(element => { 
    const dirX = element[0]
    const dirY = element[1]
    const moveLimiter = moves[1]
    const [x,y] = getFigurePosition(piece,gameBoard)
    const check = checkForCheckloop(x,y,dirX,dirY,moveLimiter,color,gameBoard)
    return check
    });
}

function checkForCheckloop(x,y,dirX,dirY,moveLimiter,color,gameBoard) {
    for(let k=1;isPossibleField(x,y,dirX,dirY,k,moveLimiter);k++) {
        const newPosX = x + dirX * k
        const newPosY = y + dirY * k
        const field = gameBoard[newPosY][newPosX]
        if(field.fieldType === "empty") continue
        return field.figureType == "king" && field.figureColor == color

    }
    return false
}

function getFigurePosition(figure,boardCopy) {
     const y = boardCopy.findIndex(innerArray => JSON.stringify(innerArray).includes(JSON.stringify(figure)));
     const x = boardCopy[y].findIndex(obj => JSON.stringify(obj) === JSON.stringify(figure));

     return [x,y];
}

