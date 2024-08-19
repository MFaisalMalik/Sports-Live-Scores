import clsx from "clsx";
import React from "react";

export default function Filters({selectedFilter, changeFilter, filters}) {
  return (
    <div className="">
      <div className="w-full overflow-scroll scrollbar-hide mt-6 flex gap-x-4 px-4 md:px-8 lg:px-12">
        {
          filters.map((filter)=> (
            <button
              key={filter}
              className={clsx(
                "text-sm font-semibold rounded-full py-1.5 px-4 bg-white border hover:border-blue-400", filter === selectedFilter ? "border-blue-400" : "border-gray-300"
              )}
            >
              {filter}
            </button>
          ))
        }
      </div>
    </div>
  );
}
