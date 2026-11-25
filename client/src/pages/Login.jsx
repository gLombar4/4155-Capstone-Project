import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import logo from "../assets/logo.png";
import Footer from "../components/footer";
import Header from "../components/header";
import "./Auth.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const notice = location.state?.message;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: username,
          user_password: password,
        }),
      });

      if (!response.ok) {
        setError(
          response.status === 401
            ? "That username or password is incorrect."
            : "Unable to log in right now. Please try again.",
        );
        return;
      }

      const data = await response.json();
      if (!data.accessToken) {
        setError("The server did not return an access token. Please try again.");
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user_name", username);
      navigate("/");
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <Header/>
      <main className="auth-page">
        <Link className="auth-brand" to="/" aria-label="Gameboxd home">
          <img src={logo} alt="" />
          <span>Gameboxd</span>
        </Link>

        <section className="auth-card" aria-labelledby="login-heading">
          <h1 id="login-heading">Welcome back</h1>
          <p className="auth-description">Log in to your Gameboxd account.</p>

          {notice && <p className="auth-notice" role="status">{notice}</p>}
          {error && <p className="auth-error" role="alert">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="auth-switch">
            New to Gameboxd? <Link to="/signup">Create an account</Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
