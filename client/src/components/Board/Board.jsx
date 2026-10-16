import { useState } from "react"
import givePossibleFields from "../../game-logic/touchPiece"
import './Board.css'

export default function Board({ board }) {
    const [displayedBoard, setDisplayedBoard] = useState(board)
    return (
        <div className='wrapper-center'>
            <div className='board'>
                {displayedBoard.map((row, rowIndex) => {
                    return row.map((figure, clmIndex) => {
                        return <Field
                            key={rowIndex * 8 + clmIndex}
                            {...{
                                rowIndex,
                                clmIndex,
                                figure,
                                setDisplayedBoard,
                                board
                            }}
                        />
                    })
                })}
            </div>
        </div>
    )
}

function Field({ rowIndex, clmIndex, figure, board, setDisplayedBoard }) {
    const color = (rowIndex + clmIndex) % 2 ? 'white' : 'black'
    return (
        <div className={`field ${color} ${figure.marked ? 'highlight' : ''}`}>
            {figure.fieldType === 'figure' &&
                <Figure
                    figure={figure}
                    onClick={() => { givePossibleFields([clmIndex, rowIndex], board, setDisplayedBoard) }}
                />
            }
        </div>
    )
}

function Figure({ figure, onClick }) {
    return (
        <img
            src={`/board-designs/figures/classic/${figure.figureColor}-${figure.figureType}.png`}
            className='img'
            onClick={onClick}
        />
    )
}
