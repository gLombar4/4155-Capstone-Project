import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import logo from "../assets/logo.png";
import Footer from "../components/footer";
import Header from "../components/header";
import "./Auth.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: username,
          user_password: password,
        }),
      });

      if (!response.ok) {
        setError(
          response.status === 409
            ? "That username is already taken."
            : "Unable to create your account right now. Please try again.",
        );
        return;
      }

      navigate("/login", {
        state: { message: "Account created. You can log in now." },
      });
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

        <section className="auth-card" aria-labelledby="signup-heading">
          <h1 id="signup-heading">Create your account</h1>
          <p className="auth-description">
            Join Gameboxd to track and review your favorite games.
          </p>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />

            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}