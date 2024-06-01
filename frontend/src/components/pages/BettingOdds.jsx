import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const matchList = ["NFL", "MLB", "NBA", "NHL"];
const oddsList = ["Moneyline", "Total Runs", "Run Line"];

export default function BettingOds() {
  const [match, setMatch] = useState("NFL");
  const [odds, setOdds] = useState("Moneyline");

  return (
    <main className="bg-blue-100 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10">
        <h1 className="text-3xl font-black text-left">
          {match} {odds} Odds
        </h1>
        <p className="font-semibold text-sm">
          <time datetime="June 01, 2024">June 01, 2024 </time> Odds
        </p>
        <div className="mt-6 flex items-center gap-x-4 w-full overflow-x-scroll scrollbar-hide">
          <select
            className="p-2 font-semibold text-sm outline-none rounded border border-gray-300"
            name="odds"
            id="odds"
            onChange={({target}) => setMatch(target.value)}
          >
            {matchList.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
          <span className="h-6 w-[1px] bg-gray-300"></span>
          <div className=" flex gap-x-4">
            {oddsList.map((item) => (
              <button
                onClick={() => setOdds(item)}
                key={item}
                className={clsx("text-sm font-semibold rounded-full py-2 px-4 bg-white border border-gray-300 hover:border-blue-400", odds === item && "border-blue-400")}
                // to={`/betting-odds/${match}/${odds}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
