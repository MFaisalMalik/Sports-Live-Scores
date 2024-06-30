import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import "./Navbar.css";
import CrossIcon from "./commons/CrossIcon";
import BarsIcon from "./commons/BarsIcon";
import clsx from "clsx";

function Navbar() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useResolvedPath()

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
      <nav className={clsx("h-20 flex items-center text-xl top-0 z-40 pl-4 pr-4 w-full bg-[var(--navbar-color)]", pathname.includes("/odds") ? "relative" : "sticky")}>
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
                  <Link to="/" className="flex items-center justify-center text-white font-semibold px-4 cursor-pointer py-2 h-full lg:hover:border-b-4 border-white transition-all" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/blogs"
                    className="flex items-center justify-center text-white font-semibold px-4 cursor-pointer py-2 h-full lg:hover:border-b-4 border-white transition-all"
                    onClick={closeMobileMenu}
                  >
                    Blogs
                  </Link>
                </li>
                <li className="group relative cursor-pointer">
                  <div className="flex items-center justify-center text-white font-semibold px-4 cursor-pointer py-2 lg:h-full lg:hover:border-b-4 border-white transition-all">
                    Games
                    <span className="ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-5 w-5 group-hover:rotate-180"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="scale-y-0 origin-top max-h-0 opacity-0 transition-all overflow-hidden lg:absolute lg:z-50 flex w-full lg:w-40 flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:scale-y-100 group-hover:max-h-none group-hover:opacity-100">
                    <Link to="/football" onClick={closeMobileMenu} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Footbal
                    </Link>

                    <Link to="/baseball" onClick={closeMobileMenu} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Baseball
                    </Link>

                    <Link to="/basketBall" onClick={closeMobileMenu} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      BasketBall
                    </Link>

                    <Link to="/hockey" onClick={closeMobileMenu} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Hockey
                    </Link>
                  </div>
                </li>

                <li className="nav-item">
                  <Link
                    to="/live-scores"
                    className="flex items-center justify-center text-white font-semibold px-4 cursor-pointer py-2 h-full lg:hover:border-b-4 border-white transition-all"
                    onClick={closeMobileMenu}
                  >
                    Live Scores
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/nfl/odds"
                    className="flex items-center justify-center text-white font-semibold px-4 cursor-pointer py-2 h-full lg:hover:border-b-4 border-white transition-all"
                    onClick={closeMobileMenu}
                  >
                    Betting Odds
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/pricing"
                    className="flex items-center justify-center text-white font-semibold px-4 cursor-pointer py-2 h-full lg:hover:border-b-4 border-white transition-all"
                    onClick={closeMobileMenu}
                  >
                    Pricing
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
                      to="/pricing"
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
                      to="/pricing"
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
