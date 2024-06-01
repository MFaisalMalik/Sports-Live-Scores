import React from "react";

export default function LiveScores() {
  return (
    <main className="bg-blue-100 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10">
        <div className="mt-10">
          <h2 className="text-lg md:text-xl font-bold text-center">NFL</h2>
          <div className="bg-blue-50 max-w-max mx-auto rounded-lg mt-4">
            <div className="flex divide-x py-2">
              <SingleMatch />
              <SingleMatch />
              <SingleMatch />
              <SingleMatch />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-lg md:text-xl font-bold text-center">MLB</h2>
          <div className="bg-blue-50 max-w-max mx-auto rounded-lg mt-4">
            <div className="flex divide-x py-2">
              <SingleMatch />
              <SingleMatch />
              <SingleMatch />
              <SingleMatch />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-lg md:text-xl font-bold text-center">NBA</h2>
          <div className="bg-blue-50 max-w-max mx-auto rounded-lg mt-4">
            <div className="flex divide-x py-2">
              <SingleMatch />
              <SingleMatch />
              <SingleMatch />
              <SingleMatch />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-lg md:text-xl font-bold text-center">NHL</h2>
          <div className="bg-blue-50 max-w-max mx-auto rounded-lg mt-4">
            <div className="flex divide-x py-2">
              <SingleMatch />
              <SingleMatch />
              <SingleMatch />
              <SingleMatch />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const SingleMatch = (props) => {
  return (
    <div className="p-6 group relative">
      <div className="absolute inset-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-white/10 backdrop-blur-[2px] transition duration-300  flex items-center justify-center">
        <button className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg">View Matchup</button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="w-6 h-6"
            src="https://www.bettingpros.com/assets/images/logos/nba/100x100/DAL.webp"
            alt=""
          />
          <p className="text-sm font-bold ml-1">DAL</p>
          <span className="ml-2 text-gray-500 text-xs font-semibold">
            50-32
          </span>
        </div>
        <div className="ml-10">
          <span className="text-xs">BOS -6.5</span>
        </div>
      </div>
      <div className="mt-1 flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="w-6 h-6"
            src="https://www.bettingpros.com/assets/images/logos/nba/100x100/BOS.webp"
            alt=""
          />
          <p className="text-sm font-bold ml-1">BOS</p>
          <span className="ml-2 text-gray-500 text-xs font-semibold">
            64-18
          </span>
        </div>
        <div className="ml-10">
          <span className="text-xs">O/U 214.5</span>
        </div>
      </div>
      <div className="mt-1 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xs font-semibold">Fri 5:30 am</span>
        </div>
        <div className="ml-10">
          <span className="text-xs font-bold">ABC</span>
        </div>
      </div>
    </div>
  );
};
