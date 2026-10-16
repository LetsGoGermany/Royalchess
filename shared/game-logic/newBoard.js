class Figure {

    constructor(figureName, color, x) {
        this.figureType = figureName
        this.figureColor = color
        this.notMoved = true
        this.fieldType = "figure"
        this.startX = x
        this.enPassentField = false
    }

}


function loadBoard() {
    const board = []
    for (let y = 0; y < 8; y++) {
        board.push([])
        for (let x = 0; x < 8; x++) {
            board[y].push({ fieldType: "empty", movableField: false, enPassentField: false })
        }
    }

    generateFigures(board)
    return board
}

function generateFigures(board) {
    placeFigures(0, 1, "white",board)
    placeFigures(7, 6, "black",board)
}

function placeFigures(primaryRow, secondaryRow, color,board) {
    const figures = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
    for (let x = 0; x < 8; x++) {
        createFigure(figures[x], x, primaryRow, color,board)
        createFigure("pawn", x, secondaryRow, color,board)
    }
}

function createFigure(figureName, x, y, color,board) {
    board[y][x] = new Figure(figureName, color, x)
}

export default loadBoard


