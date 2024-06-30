import clsx from "clsx";
import React from "react";

export default function Filters() {
  return (
    <div className="">
      <div className="w-full overflow-scroll scrollbar-hide mt-8 flex gap-x-4 px-4 md:px-8 lg:px-12">
        <button
          className={clsx(
            "text-sm font-semibold rounded-full py-1.5 px-4 bg-white border border-gray-300 hover:border-blue-400"
          )}
        >
          OverView
        </button>
        <button
          className={clsx(
            "text-sm font-semibold rounded-full py-1.5 px-4 bg-white border border-gray-300 hover:border-blue-400"
          )}
        >
          Odds
        </button>
        <button
          className={clsx(
            "text-sm font-semibold rounded-full py-1.5 px-4 bg-white border border-gray-300 hover:border-blue-400"
          )}
        >
          Picks
        </button>
        <button
          className={clsx(
            "text-sm font-semibold rounded-full py-1.5 px-4 bg-white border border-gray-300 hover:border-blue-400"
          )}
        >
          Articles
        </button>
      </div>
    </div>
  );
}
