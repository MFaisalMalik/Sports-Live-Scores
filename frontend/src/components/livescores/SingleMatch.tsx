import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function SingleMatch(props: any) {
  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    status,
    game,
    startTimestamp,
    slug,
    id,
  } = props;
  return (
    <div className="px-2">
      <div className="p-4 group relative shadow-sm bg-blue-50 rounded-md">
        <div className="absolute inset-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto rounded-md bg-white/10 backdrop-blur-[2px] transition duration-300 flex items-center justify-center">
          <Link
            href={`/live-scores/matchup/${game}/${slug}/${id}`}
            className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg"
          >
            View Matchup
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="w-6 h-6"
              src={`https://api.sofascore.app/api/v1/team/${homeTeam?.id}/image`}
              alt=""
            />
            <div className="whitespace-nowrap">
              <p className="text-sm font-bold ml-1 inline">
                {homeTeam?.nameCode}
              </p>
              {status?.description === "Ended" && (
                <span className="ml-2 text-gray-500 text-xs font-semibold">
                  {homeScore?.display}
                </span>
              )}
            </div>
          </div>

          <div className="ml-10">
            <span className="text-xs whitespace-nowrap">
              {homeScore?.current || "n/a"}
            </span>
          </div>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="w-6 h-6"
              src={`https://api.sofascore.app/api/v1/team/${awayTeam?.id}/image`}
              alt=""
            />
            <div className="whitespace-nowrap flex items-center">
              <p className="text-sm font-bold ml-1">{awayTeam?.nameCode}</p>
              {status?.description === "Ended" && (
                <span className="ml-2 text-gray-500 text-xs font-semibold">
                  {awayScore?.display}
                </span>
              )}
            </div>
          </div>
          <div className="ml-10">
            <span className="text-xs whitespace-nowrap">
              {awayScore?.current || "n/a"}
            </span>
          </div>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <div className="flex items-center">
            {status?.type === "onprogress" ? (
              <div className="flex items-center gap-x-1">
                <div className="flex justify-center items-center">
                  <div className="size-1.5 absolute animate-ping bg-blue-400 rounded-full" />
                  <div className="relative size-1 bg-blue-500 rounded-full" />
                </div>
                <span className="whitespace-nowrap text-xs font-bold text-blue-500">
                  LIVE
                </span>
              </div>
            ) : (
              <span className="whitespace-nowrap text-xs font-semibold">
                {new Date(startTimestamp * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}
                {", "}
                {new Date(startTimestamp * 1000).toLocaleTimeString("en-US", {
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
          <div className="ml-10">
            <span className="whitespace-nowrap text-xs font-bold">
              {status?.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
