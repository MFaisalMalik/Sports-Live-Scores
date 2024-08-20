"use client"

import React from "react";
import Link from "next/link";
import { formatLine, formatCost } from "@/utils/formatOdd";
import Loader from "../livescores/Loader";

export default function GameOdds({ oddsLoading, notFound, eventInfo, odds, game }) {
  // const [notFound, setNotFound] = useState(false);

  const team1 = (eventInfo?.participants && eventInfo.participants[0]) || {};
  const team2 = (eventInfo?.participants && eventInfo.participants[1]) || {};

  const odds1 = (odds?.selections && odds.selections[0]) || {};
  const odds2 = (odds?.selections && odds.selections[1]) || {};

  const caesars = odds1?.books?.find((item) => item.id === 13);
  const caesarsLine = formatLine(caesars?.lines[0]?.line);
  const caesarsCost = formatCost(caesars?.lines[0]?.cost);

  const betmgm = odds1?.books?.find((item) => item.id === 19);
  const betmgmLine = formatLine(betmgm?.lines[0]?.line);
  const betmgmCost = formatCost(betmgm?.lines[0]?.cost);

  const sportbooksFanduel = odds1?.books?.find((item) => item.id === 10);
  const sportbooksFanduelLine = formatLine(sportbooksFanduel?.lines[0]?.line);
  const sportbooksFanduelCost = formatCost(sportbooksFanduel?.lines[0]?.cost);

  const bet365 = odds2?.books?.find((item) => item.id === 24);
  const bet365line = formatLine(bet365?.lines[0]?.line);
  const bet365cost = formatCost(bet365?.lines[0]?.cost);

  const espnbet = odds2?.books?.find((item) => item.id === 33);
  const espnbetLine = formatLine(espnbet?.lines[0]?.line);
  const espnbetCost = formatCost(espnbet?.lines[0]?.cost);

  const sugarhouse = odds2?.books?.find((item) => item.id === 15);
  const sugarhouseLine = formatLine(sugarhouse?.lines[0]?.line);
  const sugarhouseCost = formatCost(sugarhouse?.lines[0]?.cost);
  return (
    <div className="w-full mt-6 flex gap-x-4 px-4 md:px-8 lg:px-12">
      <div className="w-full bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="font-semibold md:font-bold md:text-lg flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-6 stroke-2 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
            />
          </svg>
          <span className="ml-2">Game Odds</span>
        </h2>

        <div className="mt-6 grid grid-cols-5 place-items-end">
          <span className="col-span-2 text-center w-full"></span>
          <h3 className="text-center text-sm font-medium md:font-semibold w-full">
            Spread
          </h3>
          <h3 className="text-center text-sm font-medium md:font-semibold w-full">
            Total
          </h3>
          <h3 className="text-center text-sm font-medium md:font-semibold w-full">
            Moneyline
          </h3>
        </div>
        <div className="mt-1 border border-gray-200 py-4 px-2 md:px-4 rounded-xl">
          {notFound ? (
            <div className="text-center font-medium text-gray-500">
              No Odds..
            </div>
          ) : oddsLoading ? (
            <Loader />
          ) : (
            Object.keys(team1 || team2).length > 0 && (
              <>
                {Object.keys(team1).length > 0 && (
                  <div className="grid gap-x-4 grid-cols-5 place-items-end items-center">
                    <div className="col-span-2 flex gap-x-1 w-full">
                      <div className="size-8 md:size-10">
                        <img
                          src={`https://www.bettingpros.com/assets/images/logos/${game}/100x100/${team1.id}.webp`}
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h2 className="font-semibold md:font-bold text-sm md:text-xl">
                          {team1.name || "..."}
                        </h2>
                        {team1.team.record && (
                          <p className="leading-3 text-sm text-gray-600 font-semibold">
                            {team1.team.record.W}-{team1.team.record.L}
                          </p>
                        )}
                      </div>
                    </div>
                    {Object.keys(odds1).length > 0 && (
                      <>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-x-2 w-full rounded p-1 md:p-2 bg-blue-100/80 hover:bg-blue-200/70 shadow ">
                          <p className="font-semibold px-1 text-xs text-center md:text-sm md:whitespace-nowrap">
                            {caesarsLine}{" "}
                            <span className="text-[10px] md:text-xs">
                              ({caesarsCost})
                            </span>
                          </p>
                          <img
                            className="size-5 md:size-7 rounded"
                            src="https://images.fantasypros.com/images/logos/caesars-square.png"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-x-2 w-full rounded p-1 md:p-2 bg-blue-100/80 hover:bg-blue-200/70 shadow ">
                          <p className="font-semibold px-1 text-xs text-center md:text-sm md:whitespace-nowrap">
                            {betmgmLine}{" "}
                            <span className="text-[10px] md:text-xs">
                              ({betmgmCost})
                            </span>
                          </p>
                          <img
                            className="size-5 md:size-7 rounded"
                            src="https://www.bettingpros.com/assets/images/books/betmgm-logo-square.png"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-x-2 w-full rounded p-1 md:p-2 bg-blue-100/80 hover:bg-blue-200/70 shadow ">
                          <p className="font-semibold px-1 text-xs text-center md:text-sm md:whitespace-nowrap">
                            {sportbooksFanduelLine}{" "}
                            <span className="text-[10px] md:text-xs">
                              ({sportbooksFanduelCost})
                            </span>
                          </p>
                          <img
                            className="size-5 md:size-7 rounded"
                            src="https://www.bettingpros.com/assets/images/books/fanduel-logo-square.png"
                            alt=""
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
                {Object.keys(team2).length > 0 && (
                  <div className="mt-4 grid gap-x-4 grid-cols-5 place-items-end items-center">
                    <div className="col-span-2 flex gap-x-1 w-full">
                      <div className="size-8 md:size-10">
                        <img
                          src={`https://www.bettingpros.com/assets/images/logos/${game}/100x100/${eventInfo.participants[1].id}.webp`}
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h2 className="font-semibold md:font-bold text-sm md:text-xl">
                          {team2.name}
                        </h2>
                        {team1.team.record && (
                          <p className="leading-3 text-sm text-gray-600 font-semibold">
                            {team2.team.record.W}-{team1.team.record.L}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-x-2 w-full rounded p-1 md:p-2 bg-blue-100/80 hover:bg-blue-200/70 shadow ">
                      <p className="font-semibold px-1 text-xs text-center md:text-sm md:whitespace-nowrap">
                        {bet365line}{" "}
                        <span className="text-[10px] md:text-xs">
                          ({bet365cost})
                        </span>
                      </p>
                      <img
                        className="size-5 md:size-7 rounded"
                        src="https://images.fantasypros.com/images/logos/bet365-Sports-App-Icon.png"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-x-2 w-full rounded p-1 md:p-2 bg-blue-100/80 hover:bg-blue-200/70 shadow ">
                      <p className="font-semibold px-1 text-xs text-center md:text-sm md:whitespace-nowrap">
                        {espnbetLine}{" "}
                        <span className="text-[10px] md:text-xs">
                          ({espnbetCost})
                        </span>
                      </p>
                      <img
                        className="size-5 md:size-7 rounded"
                        src="https://www.bettingpros.com/assets/images/books/espnbet-icon.png"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-x-2 w-full rounded p-1 md:p-2 bg-blue-100/80 hover:bg-blue-200/70 shadow ">
                      <p className="font-semibold px-1 text-xs text-center md:text-sm md:whitespace-nowrap">
                        {sugarhouseLine}{" "}
                        <span className="text-[10px] md:text-xs">
                          ({sugarhouseCost})
                        </span>
                      </p>
                      <img
                        className="size-5 md:size-7 rounded"
                        src="https://www.bettingpros.com/assets/images/books/sugarhouse-logo-square.png"
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            className="mx-auto font-bold text-blue-500"
            href={`/odds/${game}`}
          >
            View More Odds
          </Link>
        </div>
      </div>
    </div>
  );
}
