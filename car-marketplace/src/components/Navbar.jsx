import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="nav">
            <div className="nav-inner">
                <NavLink to="/" className="brand">CarStore</NavLink>
                <nav className="links">
                    <NavLink to="/search" className="link">Shop</NavLink>
                    <NavLink to="/garage" className="link">Garage</NavLink>
                </nav>
            </div>
        </header>
    );
}