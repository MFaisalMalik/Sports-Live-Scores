import React from "react";
import "../App.css";
import Footer from "../components/Footer2";
import "./GamePages.css";
import { useParams, useResolvedPath } from "react-router-dom";
import { auth } from "../firebase/firebase";
import GameNPlayerCard from "../components/GameNPlayerCard";
import { ModalContext } from "../contexts/modalContext";

export default function Games() {
  const { gameType } = useParams();
  const { pathname } = useResolvedPath();
  const { subscriptionData } = ModalContext();

  const getLink = (stats, type) => {
    const link = `/${stats}/${gameType}/${type}`;
    if (type === "free") {
      return link;
    }
    if (type === "premium") {
      if (auth.currentUser) {
        if (subscriptionData) {
          return link;
        } else {
          return `/pricing?redirect${pathname}`
        }
      } else {
        return `/sign-in?redirect=${pathname}`;
      }
    }
  };

  return (
    <>
      <div
        className="h-[400px] bg-[var(--navbar-color)] bg-center bg-cover bg-no-repeat transition-all"
        style={{ backgroundImage: `url(/images/${gameType}-cover.jpg)` }}
      >
        <div className="w-full h-full bg-black/20 flex items-center">
          <div className="container mx-auto px-10 ">
            <h1 className="font-bold text-left text-white text-3xl sm:text-4xl lg:text-7xl">
              {gameType.toUpperCase()}
            </h1>
          </div>
        </div>
      </div>
      <section className="bg-blue-100 ">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
          <h2 className="block pb-2 mb-5 text-2xl text-center font-extrabold leading-none tracking-normal text-transparent md:text-4xl md:tracking-tight bg-clip-text bg-gradient-to-r from-blue-800 to-purple-700">
            Ready to Make Your Move? Explore Bets!
          </h2>
          <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <GameNPlayerCard
              link={getLink("games-stats","free")}
              requestType="Free"
              bet="Game"
              tagline="1 team bets /week"
            />
            <GameNPlayerCard
              link={getLink("players-stats","free")}
              requestType="Free"
              bet="Player"
              tagline="1 player bets /week"
            />
            <GameNPlayerCard
              link={getLink("games-stats","premium")}
              requestType="Premium"
              bet="Game"
              tagline="unlimited teams bets"
            />
            <GameNPlayerCard
              link={getLink("players-stats","premium")}
              requestType="Premium"
              bet="Player"
              tagline="unlimited players bets"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
