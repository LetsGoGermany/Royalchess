import Navbar from '../../components/Navbar/Navbar'
import useBoard from '../../hooks/useBoard'
import Board from '../../components/Board/Board';
import newBoardBuilder from '../../../../shared/game-logic/newBoard'
import Alert from '../../components/popups/Alert/Alert';

import './Home.css'
import Loading from '../../components/popups/Loading/Loading';

const newBoard = newBoardBuilder()

export default function Home() {
    const { loading, error, board } = useBoard()

    if (loading) {
        return (
            <>
                <Navbar />
                <Loading text="Verbinde mit dem Board"/>
                <Board board={newBoard}/>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Navbar />
                <Board board={newBoard}/>
                <Alert timeOnScreen={2} text={error}/>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <Board board={board} />
        </>
    )
}
