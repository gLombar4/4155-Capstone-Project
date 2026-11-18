import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AUTH_SESSION_CHANGED,
    clearAuthSession,
    getAuthenticatedUsername,
} from "../authSession";

function Header() {
    const [username, setUsername] = useState(getAuthenticatedUsername);
    const navigate = useNavigate();

    useEffect(() => {
        const updateUsername = () => setUsername(getAuthenticatedUsername());
        window.addEventListener(AUTH_SESSION_CHANGED, updateUsername);

        return () => {
            window.removeEventListener(AUTH_SESSION_CHANGED, updateUsername);
        };
    }, []);

    const handleLogout = () => {
        clearAuthSession();
        navigate("/", { replace: true });
    };

    return (
        <header className="site-header">
            <h1>Gameboxd</h1>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/Browser">Browser</Link>
                {username ? (
                    <>
                        <Link to={`/profile/${encodeURIComponent(username)}`}>My Profile</Link>
                        <button className="logout-button" type="button" onClick={handleLogout}>
                            Log out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;