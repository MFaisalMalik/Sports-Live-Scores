import React from "react";

export default function HeadToHead(props) {
  const {
    event: {
      homeScore,
      homeTeam,
      awayScore,
      awayTeam,
      startTime,
      status,
      startTimestamp,
    },
  } = props;
  return (
    <div className="bg-white">
      
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex md:gap-x-12 justify-center items-center bg-white p-8">
          <div className="w-2/3 flex items-center gap-x-2 md:gap-x-6 justify-end">
            <div className="flex flex-col items-end">
              {homeTeam.venue && (
                <p className="text-sm md:text-base font-medium">
                  {homeTeam.venue.city.name}
                </p>
              )}
              <h2 className="hidden lg:block mt-2 font-bold md:font-black text-right text-xl md:text-3xl">
                {homeTeam.shortName}
              </h2>
              <h2 className="lg:hidden mt-2 font-bold md:font-black text-xl md:text-3xl">
                {homeTeam.nameCode}
              </h2>
              {/* <p className="mt-2 text-sm text-gray-600 font-medium">32-35</p> */}
              {homeTeam.country && (
                <p className="mt-1 text-xs md:text-sm text-gray-600 font-medium">
                  {homeTeam.country.name}
                </p>
              )}
            </div>
            <div className="size-10 md:size-20">
              <img
                src={`https://api.sofascore.app/api/v1/team/${homeTeam.id}/image`}
                alt=""
              />
            </div>
            {homeScore && (
              <div className="">
                <p className="font-bold text-blue-500 text-xl ">
                  {homeScore.display}
                </p>
              </div>
            )}
          </div>
          <div className="">
            <p className="whitespace-nowrap text-center text-[10px] md:text-xs text-gray-600 font-medium">
              {new Date(startTimestamp * 1000).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="whitespace-nowrap text-center mt-2 text-sm font-gray-700 font-semibold">
              {new Date(startTimestamp * 1000).toLocaleTimeString("en-US", {
                formatMatcher: "basic",
                hour12: true,
                hour: "2-digit",
                minute: '2-digit'
              })}
            </p>
            <p className="whitespace-nowrap text-center mt-2 text-[10px] md:text-xs text-gray-600 font-medium">
              {status.description}
            </p>
          </div>
          <div className="w-2/3 flex items-center gap-x-2 md:gap-x-6">
            {awayScore && (
              <div className="">
                <p className="font-bold text-blue-500 text-xl ">
                  {awayScore.display}
                </p>
              </div>
            )}
            <div className="size-10 md:size-20">
              <img
                src={`https://api.sofascore.app/api/v1/team/${awayTeam.id}/image`}
                alt=""
              />
            </div>
            <div className="">
              {awayTeam.venue && (
                <p className="text-sm md:text-base font-medium">
                  {awayTeam.venue.city.name}
                </p>
              )}
              <h2 className="hidden lg:block mt-2 font-bold md:font-black text-xl md:text-3xl">
                {awayTeam.shortName}
              </h2>
              <h2 className="lg:hidden mt-2 font-bold md:font-black text-xl md:text-3xl">
                {awayTeam.nameCode}
              </h2>
              {/* <p className="mt-2 text-sm text-gray-600 font-medium">32-34</p> */}
              {awayTeam.venue && (
                <p className="mt-1 text-xs md:text-sm text-gray-600 font-medium">
                  {awayTeam.venue.country.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
