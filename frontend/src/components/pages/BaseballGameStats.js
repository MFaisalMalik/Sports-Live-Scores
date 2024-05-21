import React from "react";
import GameTable from "../GameTable";

export default function BaseballGameStats() {
  return (
    <main className="">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mt-6 mb-4">
          Baseball Game Stats
        </h1>
        <GameTable gameType="MLB" />
      </div>
    </main>
  );
}
