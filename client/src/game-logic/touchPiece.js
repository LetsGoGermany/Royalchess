import getFields from '../../../shared/game-logic/touchPiece'

export default function touchPiece(position, board, setDisplayedBoard) {
    const fields = getFields(board, position)

    const boardCopy = board.map(row => row.map(field => field))

    fields.forEach(([x, y]) => {
        boardCopy[y][x] = {
            ...boardCopy[y][x],
            marked: true
        }
    })
   setDisplayedBoard(boardCopy)
}
