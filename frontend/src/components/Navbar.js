import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import "./Navbar.css";
import CrossIcon from "./commons/CrossIcon";
import BarsIcon from "./commons/BarsIcon";

function Navbar() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="container mx-auto lg:px-6 flex justify-between items-center h-full w-full max-w-screen-2xl">
          <Link
            to="/"
            className="flex items-center justify-self-start"
            onClick={closeMobileMenu}
          >
            <img
              className="cursor-pointer no-underline text-2xl flex items-center w-16 h-16"
              src="/images/logo.png"
              alt="icon"
            />
            <span className="ml-2 flex flex-col text-white font-semibold text-lg tracking-tight leading-4 italic">
              SIMPLICITY<span>SPORT BETS</span>{" "}
            </span>
          </Link>
          <div className="flex items-center">
            <div className="menu-container flex items-center">
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/blogs"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Blogs
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/live-scores"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Live Scores
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/betting-odds"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Betting Odds
                  </Link>
                </li>

                {userLoggedIn ? (
                  <Link
                    to="/"
                    id="nav-links-mobile-sign-out"
                    className="nav-links-mobile font-semibold"
                    onClick={() => {
                      doSignOut().then(() => {
                        navigate("/", true);
                        closeMobileMenu();
                      });
                    }}
                  >
                    Sign Out
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/sign-in"
                      id="nav-links-mobile-sign-in"
                      className="nav-links-mobile font-semibold"
                      onClick={closeMobileMenu}
                    >
                      Log In
                    </Link>
                    <Link
                      to="/packages"
                      id="nav-links-mobile-sign-up"
                      className="nav-links-mobile font-semibold"
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </ul>

              {button &&
                (userLoggedIn ? (
                  <Button
                    name="sign-out"
                    buttonStyle="btn--outline"
                    onClick={() => {
                      doSignOut().then(() => navigate("/", true));
                    }}
                  >
                    SIGN OUT
                  </Button>
                ) : (
                  <>
                    <Button
                      name="sign-in"
                      buttonStyle="btn--outline"
                      to="/sign-in"
                    >
                      Log In
                    </Button>
                    <Button
                      name="sign-up"
                      buttonStyle="btn--outline"
                      to="/packages"
                    >
                      Sign Up
                    </Button>
                  </>
                ))}
            </div>
            <div className="lg:hidden ml-3" onClick={handleClick}>
              {click ? (
                <CrossIcon className="w-8 h-8 text-white" />
              ) : (
                <BarsIcon className="w-8 h-8 text-white" />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
