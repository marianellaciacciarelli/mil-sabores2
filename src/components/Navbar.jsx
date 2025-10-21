import { Link, NavLink } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#FFC0CB' }}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fw-bold" style={{ color: '#8B4513' }}>
                    🍰 Pastelería 1000 Sabores
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><NavLink end to="/" className="nav-link">Inicio</NavLink></li>
                        <li className="nav-item"><NavLink to="/catalogo" className="nav-link">Catálogo</NavLink></li>
                        <li className="nav-item"><NavLink to="/nosotros" className="nav-link">Nosotros</NavLink></li>
                        <li className="nav-item"><NavLink to="/contacto" className="nav-link">Contacto</NavLink></li>
                        <li className="nav-item"><NavLink to="/registro-usuario" className="nav-link">Registro</NavLink></li>
                        <li className="nav-item"><NavLink to="/login" className="nav-link">Login</NavLink></li>
                        <li className="nav-item">
                            <NavLink to="/carrito" className="btn btn-sm btn-outline-dark">🛒 Carrito</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}