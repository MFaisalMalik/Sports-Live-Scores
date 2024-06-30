import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Footer from "../components/Footer2";

export default function LiveScores() {
  const [football, setFootball] = useState([]);
  const [basketball, setBasketball] = useState([]);
  const [baseball, setBaseball] = useState([]);
  const [hockey, setHockey] = useState([]);

  const [nflLoading, setnflLoading] = useState(true);
  const [nbaLoading, setnbaLoading] = useState(true);
  const [mlbLoading, setmlbLoading] = useState(true);
  const [nhlLoading, setnhlLoading] = useState(true);

  const GameCodes = {
    "american-football": "NFL",
    basketball: "NBA",
    baseball: "MLB",
    "ice-hockey": "NHL",
  };

  useEffect(() => {
    const days = getDays();
    
    [
      ["american-football", setnflLoading, setFootball, football],
      ["basketball", setnbaLoading, setBasketball, basketball],
      ["baseball", setmlbLoading, setBaseball, baseball],
      ["ice-hockey", setnhlLoading, setHockey, hockey],
    ].map(([game, loader, setter, gameState]) => {
      days.map(async (day, i) => {
        return fetch(
          `https://www.sofascore.com/api/v1/sport/${game}/scheduled-events/${day}`
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            loader(false);
            if (data.events.length > 0) {
              setter((prevState) => [
                ...prevState,
                ...data.events.filter((item) =>
                  item.tournament.name.includes(GameCodes[game])
                ),
              ]);
            }
          }).catch((error)=> {
            loader(false)
            console.log(error);
          })
      });
    });
  }, []);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoPlay: true,
    className: "relative px-4 lg:px-0",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
    <main className="bg-blue-100 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10">
        <div className="mt-10">
          <h2 className="text-2xl md:text-4xl font-semibold text-center flex items-center mx-auto max-w-max">
            NFL{" "}
            <img
              className="size-12 ml-2 object-contain"
              src="/images/nfl.png"
              alt="nfl-logo"
            />{" "}
          </h2>
          <div className="max-w-5xl mx-auto rounded-lg mt-4">
            <div className="w-full">
              {nflLoading ? (
                <Loader />
              ) : !nflLoading && football.length < 1 ? (
                <div className="text-center text-sm font-bold text-gray-500">
                  There are no events at the moment.
                </div>
              ) : (
                <Slider {...settings}>
                  {football.map((item, i) => {
                    return <SingleMatch key={i} game="nfl" {...item} />;
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-center flex items-center mx-auto max-w-max">
            MLB{" "}
            <img
              className="size-12 ml-2 object-contain"
              src="/images/mlb.png"
              alt="mlb-logo"
            />{" "}
          </h2>
          <div className="max-w-5xl mx-auto rounded-lg mt-4">
            <div className="w-full">
              {mlbLoading ? (
                <Loader />
              ) : !mlbLoading && baseball.length < 1 ? (
                <div className="text-center text-sm font-bold text-gray-500">
                  There are no events at the moment.
                </div>
              ) : (
                <Slider {...settings}>
                  {baseball.map((item, i) => {
                    return <SingleMatch key={i} game="mlb" {...item} />;
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-center flex items-center mx-auto max-w-max">
            NBA{" "}
            <img
              className="size-12 ml-2 object-contain"
              src="/images/nba.png"
              alt="nba-logo"
            />{" "}
          </h2>

          <div className="max-w-5xl mx-auto rounded-lg mt-4">
            <div className="w-full">
              {nbaLoading ? (
                <Loader />
              ) : !nbaLoading && basketball.length < 1 ? (
                <div className="text-center text-sm font-bold text-gray-500">
                  There are no events at the moment.
                </div>
              ) : (
                <Slider {...settings}>
                  {basketball.map((item, i) => {
                    return <SingleMatch key={i} game="nba" {...item} />;
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-center flex items-center mx-auto max-w-max">
            NHL{" "}
            <img
              className="size-16 ml-2 object-contain"
              src="/images/nhl.png"
              alt="nhl-logo"
            />{" "}
          </h2>
          <div className="max-w-5xl mx-auto rounded-lg mt-4">
            <div className="w-full">
              {nhlLoading ? (
                <Loader />
              ) : !nhlLoading && hockey.length < 1 ? (
                <div className="text-center text-sm font-bold text-gray-500">
                  There are no events at the moment.
                </div>
              ) : (
                <Slider {...settings}>
                  {hockey.map((item, i) => {
                    return <SingleMatch key={i} game="nhl" {...item} />;
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute -right-1 lg:-right-8 top-1/2 -translate-y-1/2 p-1 lg:p-2 hover:bg-blue-50/60 hover:shadow z-10 rounded-full"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="size-5 text-gray-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute -left-1 lg:-left-8 top-1/2 -translate-y-1/2 p-1 lg:p-2 hover:bg-blue-50/60 hover:shadow z-10 rounded-full"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="size-5 text-gray-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
};
const SingleMatch = (props) => {
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
        <div className="absolute inset-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-white/10 backdrop-blur-[2px] transition duration-300 flex items-center justify-center">
          <Link
            to={`/${game}/matchup/${slug}/${id}`}
            className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg"
          >
            View Matchup
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="w-6 h-6"
              src={`https://api.sofascore.app/api/v1/team/${homeTeam.id}/image`}
              alt=""
            />
            <div className="whitespace-nowrap">
              <p className="text-sm font-bold ml-1 inline">
                {homeTeam?.nameCode}
              </p>
              {status.description === "Ended" && (
                <span className="ml-2 text-gray-500 text-xs font-semibold">
                  {homeScore.display}
                </span>
              )}
            </div>
          </div>
          <div className="ml-10">
            <span className="text-xs whitespace-nowrap">BOS -6.5</span>
          </div>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="w-6 h-6"
              src={`https://api.sofascore.app/api/v1/team/${awayTeam.id}/image`}
              alt=""
            />
            <div className="whitespace-nowrap flex items-center">
              <p className="text-sm font-bold ml-1">{awayTeam?.nameCode}</p>
              {status.description === "Ended" && (
                <span className="ml-2 text-gray-500 text-xs font-semibold">
                  {awayScore.display}
                </span>
              )}
            </div>
          </div>
          <div className="ml-10">
            <span className="text-xs whitespace-nowrap">O/U 214.5</span>
          </div>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <div className="flex items-center">
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
          </div>
          <div className="ml-10">
            <span className="whitespace-nowrap text-xs font-bold">
              {status.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Loader = () => {
  return (
    <div className="max-w-max flex gap-2 mx-auto">
      <div className="w-5 h-5 rounded-full animate-pulse bg-blue-400"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-blue-400"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-blue-400"></div>
    </div>
  );
};

export function getDays() {
  const days = [0].map((item) => {
    let today = new Date();
    return new Date(today.setDate(today.getDate() + item))
      .toISOString()
      .split("T")[0];
  });
  return days;
}
