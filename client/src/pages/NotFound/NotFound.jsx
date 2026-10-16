import './NotFound.css'
import Navbar from '../../components/Navbar/Navbar'
export default function NotFound() {
    return (
        <>
        <Navbar />
        <main className="not-found">
            <div className="not-found-card">

                <div className="chess-piece">♔</div>

                <div className="error-code">
                    404
                </div>

                <h1>Position not found</h1>

                <p>
                    Diese Seite existiert nicht oder wurde verschoben.
                </p>

                <a href="/" className="home-button">
                    Zurück zum Brett
                </a>

            </div>
        </main>
        </>
    )
}