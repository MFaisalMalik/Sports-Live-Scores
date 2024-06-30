import React from "react";
import GameTable from "../components/GameTable";


export default function HockeyGameStats() {
  return (
    <>
    <div className="container mx-auto px-4 md:px-8 lg:px-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-6 mb-4">Hockey Game Stats</h1>
      <GameTable gameType="NHL" />
    </div>
    </>
  );
}
