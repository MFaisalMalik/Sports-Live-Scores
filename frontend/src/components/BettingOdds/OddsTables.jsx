"use client"

import React, { useEffect, useRef, useState } from "react";
import BestOddsBadge from "./BestOddsBadge";
import BetMgmLogo from "./BetMgmLogo";
import clsx from "clsx";
import Loader from "../livescores/Loader";
import getDays from "@/utils/getDays";
import { formatCost, formatLine } from "@/utils/formatOdd";
import Image from "next/image";
import { bet365, betrivers, caesars, draftsKing, espnbets, fanduel, partycasino, sugarhouse } from "@/assets/images";

export default function OddsTables({ game }) {
  const tableHeadRef = useRef();
  const [tableSticked, setTableStick] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventIds, setEventIds] = useState([]);
  const [odds, setOdds] = useState({ offers: [] });
  const [teamDetails, setTeamDetails] = useState([]);

  function fetchData(eventIds) {
    const marketIds = { NBA: 129, NFL: 3, MLB: 122, NHL: 195 };
    fetch(
      `https://api.bettingpros.com/v3/offers?picks=true&sport=${game}&market_id=${
        marketIds[game]
      }&location=INT&event_id=${
        eventIds.length > 1
          ? eventIds.map((item) => item.id).join(":")
          : eventIds[0].id
      }`,
      {
        headers: {
          "x-api-key": "3Qloi2Pj8b6HJ0jmSVoW77vBm3EkfqnD1XUo526p",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.offers.length > 0) {
          setLoading(false);
          setOdds(data);
        } else {
          setLoading(false);
          setNoDataFound(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  useEffect(() => {
    setLoading(true);
    function fetchEventIds() {
      fetch(`https://api.bettingpros.com/v3/events?sport=${game}`, {
        headers: {
          "x-api-key": "3Qloi2Pj8b6HJ0jmSVoW77vBm3EkfqnD1XUo526p",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data) {
            if (data.events.length > 0) {
              fetchData(data.events);
              setEventIds(data.events);
              setNoDataFound(false);
            } else {
              setLoading(false);
              setNoDataFound(true);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchEventIds();
  }, [game]);

  // useEffect(() => {
  //   let tableHeadOffsetTop = tableHeadRef.current.offsetTop;
  //   window.addEventListener("scroll", (e) => {
  //     console.log(window.scrollY);
  //     console.log(tableHeadOffsetTop);
  //     if (window.scrollY >= tableHeadOffsetTop) {
  //       setTableStick(true);
  //     } else {
  //       setTableStick(false);
  //     }
  //   });

  //   return window.removeEventListener("scroll", () => {});
  // }, []);

  const elementRef = useRef(null);

  useEffect(() => {
    const checkIfTouchedTop = () => {
      if (elementRef.current?.getBoundingClientRect().top <= 0) {
        setTableStick(true);
      } else {
        setTableStick(false);
      }
    };

    window.addEventListener("scroll", checkIfTouchedTop);
    return () => window.removeEventListener("scroll", checkIfTouchedTop);
  }, []);

  return noDataFound ? (
    <h2 className="text-center font-medium">
      (No Data Found, check other games)
    </h2>
  ) : (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="w-full">
        <div
          ref={elementRef}
          style={{ maxHeight: tableSticked ? "100vh" : "max-content" }}
          className="w-full overflow-y-auto scrollbar-hide pb-10"
        >
          {loading ? (
            <div className="">
              <Loader />
            </div>
          ) : (
            odds.offers.length > 0 && (
              <>
                <TableHead tableHeadRef={tableHeadRef} />
                {odds.offers.map((item) => (
                  <Match
                    eventIds={eventIds}
                    key={item.id}
                    game={game}
                    data={item}
                    teamDetails={teamDetails}
                  />
                ))}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const TableHead = ({ tableHeadRef }) => {
  return (
    <div
      ref={tableHeadRef}
      className={clsx("flex items-center w-max sticky top-0 z-20")}
    >
      <span className="sticky left-0 z-10 bg-blue-50 w-[140px] md:w-[300px] h-14"></span>
      <div className="flex gap-x-4 bg-blue-50 pr-2 py-2">
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-gray-200 flex items-center justify-center">
          OPEN
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-yellow-400 flex items-center justify-center gap-x-2">
          <BestOddsBadge /> BEST ODDS
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-black flex items-center justify-center gap-x-2">
          <BetMgmLogo className="w-24" />
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-black flex items-center justify-center gap-x-2">
          <Image
            src={draftsKing}
            className="w-full h-full py-px px-1 object-contain"
            alt=""
          />
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-[#243657] flex items-center justify-center gap-x-2">
          <Image
            src={fanduel}
            className="w-full h-full py-px px-1 object-contain"
            alt=""
          />
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-[#093532] flex items-center justify-center gap-x-2">
          <Image
            src={caesars}
            className="w-full h-full py-px px-1 object-contain"
            alt=""
          />
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-[#00142b] flex items-center justify-center gap-x-2">
          <Image
            src={espnbets}
            className="w-full h-full py-px px-1 object-contain"
            alt=""
          />
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-[#027b5b] flex items-center justify-center gap-x-2">
          <Image
            src={bet365}
            className="w-full h-full py-px px-1 object-contain"
            alt=""
          />
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-[#21517d] flex items-center justify-center gap-x-2">
          <Image
            src={sugarhouse}
            className="w-full h-full py-px px-1 object-contain"
            alt=""
          />
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-[#1a2c4d] flex items-center justify-center gap-x-2">
          <Image
            src={betrivers}
            className="w-full h-full py-px px-1 object-contain"
            alt=""
          />
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-xs md:text-sm py-2 rounded-lg bg-[#201551] flex items-center justify-center gap-x-2">
          <Image
            src={partycasino}
            className="w-full h-full py-px px-1 object-contain"
            alt=""
          />
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-black text-white py-2 rounded-lg bg-[#05318a] flex items-center justify-center gap-x-2">
          CONSENSUS
        </div>
      </div>
    </div>
  );
};

const Match = ({ data, game, eventIds }) => {
  const matchInfo = eventIds.find((item) => item.id === data.event_id);
  return (
    <div className="relative w-max shadow-md">
      <div className="w-max bg-white py-2 flex flex-col gap-y-2 rounded-t-lg mt-2 md:mt-4">
        <Team
          odds={data?.selections[1]}
          teamInfo={matchInfo?.participants?.find(
            (item) => item.id === data.selections[1].participant
          )}
          game={game}
        />
        <Team
          odds={data?.selections[0]}
          teamInfo={matchInfo?.participants?.find(
            (item) => item.id === data.selections[0].participant
          )}
          game={game}
        />
      </div>
      <div className="sticky left-0 w-[calc(100vw-1.2rem)] py-2 px-4 bg-gray-50 flex justify-between">
        <div className="w-full flex justify-between">
          <div className="flex gap-x-4">
            {/* <span className="font-bold text-sm text-white bg-blue-700 px-4 py-1 rounded-full flex items-center">
              {" "}
              <span className="animate-ping mr-2 w-1 h-1 bg-white rounded-full flex items-center justify-center">
                {" "}
                <span className="w-1 h-1 bg-white rounded-full"></span>
              </span>{" "}
              LIVE
            </span> */}
          </div>
          {/* <Link
            href={`/mlb/matchup/team-vs-team/${matchInfo.id}`}
            className="text-blue-700 font-bold"
          >
            View Matchup
          </Link> */}
        </div>
      </div>
    </div>
  );
};

const Team = ({ odds, teamInfo, game }) => {
  // console.log(teamInfo);
  // console.log(odds);
  const openningLine = formatLine(odds?.opening_line?.line);
  const openningCost = formatCost(odds?.opening_line?.cost);

  const bet365 = odds.books.find((item) => item.id === 24);
  const bet365line = formatLine(bet365?.lines[0]?.line);
  const bet365cost = formatCost(bet365?.lines[0]?.cost);

  const partyCasino = odds.books.find((item) => item.id === 27);
  const partyCasinoLine = formatLine(partyCasino?.lines[0]?.line);
  const partyCasinoCost = formatCost(partyCasino?.lines[0]?.cost);

  const betRivers = odds.books.find((item) => item.id === 18);
  const betRiversLine = formatLine(betRivers?.lines[0]?.line);
  const betRiversCost = formatCost(betRivers?.lines[0]?.cost);

  const sugarhouse = odds.books.find((item) => item.id === 15);
  const sugarhouseLine = formatLine(sugarhouse?.lines[0]?.line);
  const sugarhouseCost = formatCost(sugarhouse?.lines[0]?.cost);

  const espnbet = odds.books.find((item) => item.id === 33);
  const espnbetLine = formatLine(espnbet?.lines[0]?.line);
  const espnbetCost = formatCost(espnbet?.lines[0]?.cost);

  const caesars = odds.books.find((item) => item.id === 13);
  const caesarsLine = formatLine(caesars?.lines[0]?.line);
  const caesarsCost = formatCost(caesars?.lines[0]?.cost);

  const betmgm = odds.books.find((item) => item.id === 19);
  const betmgmLine = formatLine(betmgm?.lines[0]?.line);
  const betmgmCost = formatCost(betmgm?.lines[0]?.cost);

  const sportbooksFanduel = odds.books.find((item) => item.id === 10);
  const sportbooksFanduelLine = formatLine(sportbooksFanduel?.lines[0]?.line);
  const sportbooksFanduelCost = formatCost(sportbooksFanduel?.lines[0]?.cost);

  const allOddsLine = [
    openningLine,
    bet365line,
    partyCasinoLine,
    betRiversLine,
    sugarhouseLine,
    espnbetLine,
    caesarsLine,
    betmgmLine,
    sportbooksFanduelLine,
  ];
  const allOddsCost = [
    openningCost,
    bet365cost,
    partyCasinoCost,
    betRiversCost,
    sugarhouseCost,
    espnbetCost,
    caesarsCost,
    betmgmCost,
    sportbooksFanduelCost,
  ];
  const numericLines = allOddsLine.filter(
    (value) => typeof +value === "number" && !isNaN(value)
  );
  const numericCosts = allOddsCost.filter(
    (value) => typeof +value === "number" && !isNaN(value)
  );
  const bestOddsLine = Math.max(...numericLines);
  const bestOddsCosts = Math.max(...numericCosts);

  return (
    <div className="relative flex items-center">
      <div className="sticky left-0 z-10 bg-white w-[140px] md:w-[300px] h-14 flex items-center">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center">
            <img
              className="size-8 lg:size-10 object-contain mr-2"
              src={`https://www.bettingpros.com/assets/images/logos/${game.toLowerCase()}/100x100/${
                odds?.short_label
              }.webp`}
              alt=""
            />
            <div>
              <h2 className="text-sm md:text-xl font-bold">
                <span className="md:hidden">{odds?.short_label}</span>
                {teamInfo?.team && (
                  <span className="hidden md:inline">
                    {teamInfo?.team?.city}
                  </span>
                )}
              </h2>
              {teamInfo?.team?.record && (
                <p className="text-[10px] leading-3 font-bold text-gray-600">
                  {teamInfo.team.record?.W + "-" + teamInfo.team.record?.L}
                </p>
              )}
            </div>
          </div>
          <div className="">
            <span className="text-sm md:text-xl font-bold text-blue-600">
              {/* {teamScore?.display} */}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4 pr-4">
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold py-2 rounded-lg bg-white flex flex-col items-center justify-center">
          <span className="text-sm text-gray-600">{openningLine}</span>
          <span className="text-xs">({openningCost})</span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-amber-100 shadow flex flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-600">
            {bestOddsLine > 0 ? `+${bestOddsLine}` : bestOddsLine}
          </span>
          <span className="text-xs">
            ({bestOddsCosts > 0 ? `+${bestOddsCosts}` : bestOddsCosts})
          </span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-600">{betmgmLine}</span>
          <span className="text-xs">({betmgmCost})</span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          ---
          {/* <span className="text-sm text-gray-600">{}</span>
          <span className="text-xs">({})</span> */}
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-600">{sportbooksFanduelLine}</span>
          <span className="text-xs">({sportbooksFanduelCost})</span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-600">{caesarsLine}</span>
          <span className="text-xs">({caesarsCost})</span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-600">{espnbetLine}</span>
          <span className="text-xs">({espnbetCost})</span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-600">{bet365line}</span>
          <span className="text-xs">({bet365cost})</span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-600">{sugarhouseLine}</span>
          <span className="text-xs">({sugarhouseCost})</span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-600">{betRiversLine}</span>
          <span className="text-xs">({betRiversCost})</span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-600">{partyCasinoLine}</span>
          <span className="text-xs">({partyCasinoCost})</span>
        </div>
        <div className="w-28 md:w-32 h-12 md:h-10 font-bold text-xs md:text-sm py-2 rounded-lg bg-white shadow flex flex-col items-center justify-center gap-x-2">
          ---
        </div>
      </div>
    </div>
  );
};

const gameCodes = {
  NFL: "american-football",
  NBA: "basketball",
  MLB: "baseball",
  NHL: "ice-hockey",
};

const fetchTeamDetails = (game, setTeamDetails) => {
  const days = getDays();
  days.map(async (day) => {
    return fetch(
      `https://www.sofascore.com/api/v1/sport/${gameCodes[game]}/scheduled-events/${day}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setTeamDetails((prevState) => [
          ...prevState,
          ...data.events.filter((item) => item.tournament.name.includes(game)),
        ]);
      });
  });
};
