
import './Navbar.css'
import useLogin from '../../hooks/useLogin'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const loggedIn = useLogin()
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        { path: '/', text: 'Royalchess', src: '/nav-icons/logo.png' },
        { path: '/play', text: 'Play', src: '/nav-icons/play.png' },
        { path: '/friends', text: 'Friends', src: '/nav-icons/friends.png' },
        { path: '/games/review', text: 'Games', src: '/nav-icons/review.png' },
        { path: '/settings', text: 'Settings', src: '/nav-icons/settings.png' },
    ]

    function closeSidebar() {
        setIsOpen(false)
    }

    return (
        <>
            <button
                className={`menu-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={isOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {isOpen && (
                <div
                    className="sidebar-backdrop"
                    onClick={closeSidebar}
                />
            )}

            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul className="nav-list">
                    {links.map(tab => (
                        <NavTab
                            key={tab.path}
                            tab={tab}
                            onNavigate={closeSidebar}
                        />
                    ))}

                    <LowerElements
                        loggedIn={loggedIn}
                        onNavigate={closeSidebar}
                    />
                </ul>
            </nav>
        </>
    )
}

function NavTab({ tab, onNavigate }) {
    return (
        <li className={`nav-list-element ${tab.text.toLowerCase()}`}>
            <a
                className="nav-link"
                href={tab.path}
                onClick={onNavigate}
            >
                <img
                    src={tab.src}
                    alt=""
                    className="nav-icon"
                />
                {tab.text}
            </a>
        </li>
    )
}

function LowerElements({ loggedIn, onNavigate }) {
    const logInTitle = loggedIn.user && loggedIn.user?.success ? 'login' : 'logout'

    const logInStatus = {
        login: {
            path: '/logout',
            text: 'Logout',
            src: '/nav-icons/logout.png'
        },
        logout: {
            path: '/login',
            text: 'Login',
            src: '/nav-icons/login.png'
        },
    }

    return (
        <section className="lower-section">
            <ToggleThemeBtn />
            <NavTab
                tab={logInStatus[logInTitle]}
                onNavigate={onNavigate}
            />
        </section>
    )
}

function ToggleThemeBtn() {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'lightmode'
    )

    useEffect(() => {
        document.documentElement.className = theme
    }, [theme])

    function toggleDarkMode() {
        const newTheme =
            theme === 'darkmode' ? 'lightmode' : 'darkmode'

        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return (
        <div
            className="theme-mode-container"
            onClick={toggleDarkMode}
        >
            <img
                src={`/nav-icons/${theme}.png`}
                className={theme}
                alt="Theme wechseln"
            />
        </div>
    )
}
