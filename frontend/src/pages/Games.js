import React from "react";
import "../App.css";
import Footer from "../components/Footer2";
import "./GamePages.css";
import { useParams } from "react-router-dom";
import GameNPlayerCard from "../components/GameNPlayerCard";

export default function Games() {
  const { gameType } = useParams();
  const imageUrl = `/images/${gameType}-cover.jpg`;
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
              link={`/game-stats/${gameType}/free`}
              requestType="Free"
              bet="Game"
            />
            <GameNPlayerCard link="/sign-in" requestType="Free" bet="Player" />
            <GameNPlayerCard
              link={`/game-stats/${gameType}/premium`}
              requestType="Premium"
              bet="Game"
            />
            <GameNPlayerCard
              link="/sign-in"
              requestType="Premium"
              bet="Player"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
