import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home/Home'
import './styles/index.css'
import './styles/themes.css'
import { AuthProvider } from './context/AuthContext.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Login/register.jsx'
import Play from './pages/Play/Play.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login />},
  { path: '/register', element: <Register />},
  { path: '/play', element: <Play />},
  { path: '*', element: <NotFound />},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
