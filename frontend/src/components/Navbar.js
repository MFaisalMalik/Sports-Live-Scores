import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import "./Navbar.css";
import CrossIcon from "./commons/CrossIcon";
import BarsIcon from "./commons/BarsIcon";
import clsx from "clsx";
import UserDropdown from "./UserDropdown";

function Navbar() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav
        className={clsx(
          "h-20 flex items-center text-xl top-0 z-40 pl-4 pr-4 w-full bg-[var(--navbar-color)]",
          pathname.includes("/odds") ? "relative" : "sticky"
        )}
      >
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
                  <Link
                    to="/"
                    className="flex items-center justify-center text-white font-semibold px-4 cursor-pointer py-2 h-full lg:hover:border-b-4 border-white transition-all"
                    onClick={closeMobileMenu}
                  >
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
                  <div className="scale-y-0 origin-top max-h-0 opacity-0 transition-all overflow-hidden lg:absolute lg:z-50 flex w-full lg:w-52 flex-col bg-[var(--navbar-color)] py-1 px-2 rounded-b-xl shadow-xl group-hover:scale-y-100 group-hover:max-h-none group-hover:opacity-100">
                    <Link
                      to="games/football"
                      onClick={closeMobileMenu}
                      className="my-2 block border-b border-gray-600 py-1 font-semibold text-gray-500 hover:text-white/50 md:mx-2"
                    >
                      Football
                    </Link>

                    <Link
                      to="games/baseball"
                      onClick={closeMobileMenu}
                      className="my-2 block border-b border-gray-600 py-1 font-semibold text-gray-500 hover:text-white/50 md:mx-2"
                    >
                      Baseball
                    </Link>

                    <Link
                      to="games/basketBall"
                      onClick={closeMobileMenu}
                      className="my-2 block border-b border-gray-600 py-1 font-semibold text-gray-500 hover:text-white/50 md:mx-2"
                    >
                      BasketBall
                    </Link>

                    <Link
                      to="games/hockey"
                      onClick={closeMobileMenu}
                      className="my-2 block py-1 font-semibold text-gray-500 hover:text-white/50 md:mx-2"
                    >
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
              </ul>

              {userLoggedIn ? (
                <UserDropdown />
              ) : (
                <>
                  <Link
                    className="ml-2 text-base font-semibold flex items-center text-orange-500"
                    onClick={closeMobileMenu}
                    to="/sign-in"
                  >
                    Log In
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 ml-1 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </Link>
                </>
              )}
            </div>
            <div className="lg:hidden ml-3" onClick={handleClick}>
              {click ? (
                <CrossIcon className="w-8 h-8 text-white cursor-pointer" />
              ) : (
                <BarsIcon className="w-8 h-8 text-white cursor-pointer" />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
