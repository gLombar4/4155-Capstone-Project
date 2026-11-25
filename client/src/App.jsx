import { useEffect, useState } from "react";
import logo from './assets/logo.png'
import { IoLogoGameControllerA } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import './App.css'
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Browser from './Browser.jsx'
import { GamePage } from './components/GamePage.jsx';

import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import { AUTH_SESSION_CHANGED, getAuthenticatedUsername } from "./authSession";

function Home() {
  const logoColor = "#79d8d4";
  const [username, setUsername] = useState(getAuthenticatedUsername);

  useEffect(() => {
    const updateUsername = () => setUsername(getAuthenticatedUsername());
    window.addEventListener(AUTH_SESSION_CHANGED, updateUsername);

    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGED, updateUsername);
    };
  }, []);

  return (
    <>
    <Header />
      <section id="center">
        <div className="hero">
          <img src={logo} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>Gameboxd</h1>
          <p>
            A home for game enthusiasts
          </p>
        </div>
      </section>

      <section id="next-steps">
        <div id="docs">
          <IoLogoGameControllerA color={logoColor} size={50}/>
          <h2>Thousands of games, all in one place</h2>
          <p>Track, review, and recommend your favorite games</p>
          <ul>
            <li>
              <Link to="/Browser">
              <FaMagnifyingGlass />
                Search for games
                </Link>
                
            </li>
          </ul>
        </div>
        <div id="social">
          <CgProfile color={logoColor} size={40}/>
          <h2>{username ? `Welcome, ${username}` : "Get Started"}</h2>
          <p>{username ? "View your Gameboxd profile." : "Create or login to an account"}</p>
          <ul>
            {username ? (
              <li>
                <Link to={`/profile/${encodeURIComponent(username)}`}>My Profile</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/signup">
                    <FaUserPlus />
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <CiLogin />
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Browser" element={<Browser />} />
        <Route path="/GamePage/:game_id" element={<GamePage/>}/>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
