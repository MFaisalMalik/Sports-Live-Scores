import React from "react";
import "../App.css";
import Footer from "../components/Footer2";
import "./GamePages.css";
import { useParams, useNavigate, useResolvedPath } from "react-router-dom";
import { auth } from "../firebase/firebase";
import GameNPlayerCard from "../components/GameNPlayerCard";

export default function Games() {
  const { gameType } = useParams();
  const imageUrl = `/images/${gameType}-cover.jpg`;
  // const navigate = useNavigate()
  const { pathname } = useResolvedPath()

  const getLink = (state, game, type) => {
    const link = `/game-stats/${gameType}/${type}`
    if (type === 'free'){
      return link
    } else {
      if (auth.currentUser) {
        return link
      } else {
        return `/sign-in?redirect=${pathname}`
      }
    }
  }


  return (
    <>
      <div
        className="h-[400px] bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
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
              link={`/games-stats/${gameType}/free`}
              requestType="Free"
              bet="Game"
              tagline="10 teams bets /week"
            />
            <GameNPlayerCard
              link={`/players-stats/${gameType}/free`}
              requestType="Free"
              bet="Player"
              tagline="10 players bets /week"
            />
            <GameNPlayerCard
              link={`/games-stats/${gameType}/premium`}
              requestType="Premium"
              bet="Game"
              tagline="unlimited teams bets"
            />
            <GameNPlayerCard
              link={`/players-stats/${gameType}/premium`}
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
