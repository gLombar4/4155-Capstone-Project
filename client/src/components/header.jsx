import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="site-header">
            <h1>Gameboxd</h1>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/Browser">Browser</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </nav>
        </header>
    );
}

export default Header;