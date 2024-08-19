import clsx from "clsx";
import React from "react";



export default function Header(props) {
  const {gameList, oddsList, game, setGame, odds, setOdds} = props
  const date = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: "2-digit",
    year: "numeric"
  })
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-left">
        {game} Odds
      </h1>
      <p className="font-semibold text-sm">
        <time dateTime={date}>{date} </time> Odds
      </p>
      <div className="mt-6 flex items-center gap-x-4 w-full overflow-x-scroll scrollbar-hide">
        <select
          className="p-2 font-semibold text-sm outline-none rounded border border-gray-300"
          name="game"
          id="game"
          value={game}
          onChange={({ target }) => setGame(target.value)}
        >
          {gameList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {/* <span className="h-6 w-[1px] bg-gray-300"></span>
        <div className=" flex gap-x-4">
          {oddsList.map((item) => (
            <button
              onClick={() => setOdds(item)}
              key={item}
              className={clsx(
                "text-sm whitespace-nowrap font-semibold rounded-full py-2 px-4 bg-white border border-gray-300 hover:border-blue-400",
                odds === item && "border-blue-400"
              )}
              // href={`/betting-odds/${match}/${odds}`}
            >
              {item}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
}
