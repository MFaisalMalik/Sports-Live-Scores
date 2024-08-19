"use client"

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import getDays from "@/utils/getDays"
import NextArrow from "@/components/livescores/NextArrow"
import PrevArrow from '@/components/livescores/PrevArrow'
import SingleMatch from "@/components/livescores/SingleMatch"
import Loader from "@/components/LiveScores/Loader";
import { mlb, nba, nfl, nhl } from "@/assets/images";
import Image from "next/image";

export default function LiveScores() {
  const [football, setFootball] = useState([]);
  const [footballDisplay, setFootballDisplay] = useState([]);
  const [basketball, setBasketball] = useState([]);
  const [basketballDisplay, setBasketballDisplay] = useState([]);
  const [baseball, setBaseball] = useState([]);
  const [baseballDisplay, setBaseballDisplay] = useState([]);
  const [hockey, setHockey] = useState([]);
  const [hockeyDisplay, setHockeyDisplay] = useState([]);

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

  // function getdata(interval) {
  //   const days = getDays();
  //   console.log(interval);
  //   [
  //     ["american-football", setnflLoading, setFootball, football],
  //     ["basketball", setnbaLoading, setBasketball, basketball],
  //     ["baseball", setmlbLoading, setBaseball, baseball],
  //     ["ice-hockey", setnhlLoading, setHockey, hockey],
  //   ].map(([game, loader, seter, gameState]) => {
  //     days.map(async (day, i) => {
  //       return fetch(
  //         `https://www.sofascore.com/api/v1/sport/${game}/scheduled-events/${day}`
  //       )
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((data) => {
  //           loader(false);
  //           if (data.events.length > 0) {
  //             seter((prevState) => [
  //               ...prevState,
  //               ...data.events.filter((item) =>
  //                 item.tournament.name.includes(GameCodes[game])
  //               ),
  //             ]);
  //           }
  //         })
  //         .catch((error) => {
  //           loader(false);
  //           console.log(error);
  //         });
  //     });
  //   });
  // }

  const getdata = async () => {
    const days = getDays();
    const fetchData = async (game: string, loader:any, seter:any) => {
      // seter([]); // Clear previous data
      const promises = days.map((day, index) =>
        fetch(`https://www.sofascore.com/api/v1/sport/${game}/scheduled-events/${day}`)
          .then((res) => res.json())
          .then((data) => {
            loader(false);
            if (data.events.length > 0) {
              seter((prevState: any) => {
                if (prevState.length === 0){
                  return data.events.filter((item: any) =>
                    item.tournament.name.includes(GameCodes[game])
                  )
                }
                if (prevState.length !== 0 && index === 0) {
                  return data.events.filter((item: any) =>
                    item.tournament.name.includes(GameCodes[game])
                  )
                }
                if (prevState.length !== 0 && index !== 0) {
                  return [
                    ...prevState,
                    ...data.events.filter((item: any) =>
                      item.tournament.name.includes(GameCodes[game])
                    ),
                  ]
                }
              } );
            }
          })
          .catch((error) => {
            loader(false);
            console.log(error);
          })
      );
      await Promise.all(promises);
    };

    await Promise.all([
      fetchData("american-football", setnflLoading, setFootball),
      fetchData("basketball", setnbaLoading, setBasketball),
      fetchData("baseball", setmlbLoading, setBaseball),
      fetchData("ice-hockey", setnhlLoading, setHockey),
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getdata();
      const interval = setInterval(async () => {
        await getdata();
      }, 5000);
      return () => clearInterval(interval); // Cleanup interval on component unmount
    };

    fetchData();
  }, []);


  useEffect(()=> {
    if (footballDisplay.length === 0) {
      setFootballDisplay(football)
    }
  }, [football])

  useEffect(()=> {
    if (baseballDisplay.length === 0) {
      setBaseballDisplay(baseball)
    }
  }, [baseball])

  useEffect(()=> {

  }, [basketball])

  useEffect(()=> {

  }, [hockey])

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
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

  function compare(a: any, b: any) {
    if (a?.status?.type === "onprogress") {
      return -1;
    }
    return 1;
  }

  return (
    <>
      <main className="bg-blue-100 min-h-screen">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10">
          <div className="mt-10">
            <h2 className="text-2xl md:text-4xl font-semibold text-center flex items-center mx-auto max-w-max">
              NFL{" "}
              <Image
                className="size-12 ml-2 object-contain"
                src={nfl}
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
                    {footballDisplay?.sort(compare)?.map((item, i) => {
                      // let newItem = football?.sort(compare)[i]
                      // console.log(newItem);
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
              <Image
                className="size-12 ml-2 object-contain"
                src={mlb}
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
                    {baseballDisplay?.sort(compare)?.map((item, i) => {
                      let data = item
                      let newItem = baseball && baseball.sort(compare)[i]
                      
                      if (JSON.stringify(item) !== JSON.stringify(newItem)){
                        data = newItem
                      }
                      return <SingleMatch key={i} game="mlb" {...data} />;
                    })}
                  </Slider>
                )}
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl md:text-4xl font-semibold text-center flex items-center mx-auto max-w-max">
              NBA{" "}
              <Image
                className="size-12 ml-2 object-contain"
                src={nba}
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
                    {basketball?.sort(compare)?.map((item, i) => {
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
              <Image
                className="size-16 ml-2 object-contain"
                src={nhl}
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
                    {hockey?.sort(compare)?.map((item, i) => {
                      return <SingleMatch key={i} game="nhl" {...item} />;
                    })}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}