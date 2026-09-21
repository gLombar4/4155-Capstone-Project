import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import logo from './assets/logo.png'
import { IoLogoGameControllerA } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiLogin, CiStar } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import './App.css'

function App() {
  const logoColor = "#79d8d4";
  return (
    <>
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
              {/* TODO: Link search button to */}
              <a href="" target="_blank">
                <FaMagnifyingGlass />
                Search for games
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <CiStar />
                View trending titles
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <CgProfile color={logoColor} size={40}/>
          <h2>Get Started</h2>
          <p>Create or login to an account </p>
          <ul>
            <li>
              {/* TODO: Link the sign up button to account creation */}
              <a href="" target="_blank">
                <FaUserPlus />
                Sign Up
              </a>
            </li>
            <li>
              {/* TODO: Link the login button to login functionality */}
              <a href="" target="_blank">
                <CiLogin />
                Login
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
