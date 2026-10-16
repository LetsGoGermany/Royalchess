const possibleMovesByName = {
    king: kingMoves(),
    queen: queenMoves(),
    rook: rookMoves(),
    bishop: bishopMoves(),
    knight: knightMoves(),
}


function bishopMoves() {
    let moves = [[1,1],[1,-1],[-1,1],[-1,-1]]
    return [moves,-1]
}

function knightMoves() {
    let moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]]
    return [moves,1]
}

function rookMoves() {
    let moves = [[1,0],[-1,0],[0,1],[0,-1]]
    return [moves,-1]
}


function queenMoves() {
    let straightMoves = rookMoves()[0]
    let diagonalMoves = bishopMoves()[0]
    let moves = [...straightMoves,...diagonalMoves]
    return [moves,-1]
}

function kingMoves() {
    let moves = queenMoves()[0]
    return [moves,1]
}

function isPossibleField(x, y, dirX, dirY, i, moveLimiter) {
    if (x + dirX * i > 7) return false
    if (x + dirX * i < 0) return false
    if (y + dirY * i > 7) return false
    if (y + dirY * i < 0) return false
    if (moveLimiter > 0 && i > moveLimiter) return false
    return true
}

function canPieceGiveCheckInTheory(piece,kingX,kingY,pieceX,pieceY,direction) {
    const dx = Math.abs(kingX - pieceX)
    const dy = Math.abs(kingY - pieceY)

    const figureCheckList = {
        bishop: dx === dy,
        rook: dx === 0 || dy === 0,
        knight: dx === 2 && dy === 1 || dx === 1 && dy === 2,
        pawn: pieceY + direction === kingY && dx === 1,
        queenMoves: dx === 0 || dy == 0 || dx == dy,
        king: dx <= 1 && dy <= 1,
    }
    return  figureCheckList[piece]
}

export { possibleMovesByName, isPossibleField, canPieceGiveCheckInTheory}