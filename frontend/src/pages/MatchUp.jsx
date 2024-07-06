import React, { useEffect, useState } from "react";
import HeadToHead from "../components/matchup/HeadToHead";
import Filters from "../components/matchup/Filters";
import GameOdds from "../components/matchup/GameOdds";
import { useParams } from "react-router-dom";
import { Loader } from "./LiveScores";
import RelatedArticles from "../components/matchup/RelatedArticles";
export default function MatchUp() {
  const { game, slug, id } = useParams();
  const [HeadTOHead, setHeadToHead] = useState();
  const [eventInfo, setEventInfo] = useState(null);
  const [odds, setOdds] = useState({});
  const [oddsLoading, setOddsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false)
  const filters = ["Overview", "Odds", "Picks", "Articles"];
  const [selectedFilter, setFilter] = useState(filters[0]);

  useEffect(() => {
    let teams = {};
    fetch(`https://www.sofascore.com/api/v1/event/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          setHeadToHead(data);
          teams = {
            homeTeam: data.event.homeTeam,
            awayTeam: data.event.awayTeam,
          };
          fetchId();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    function fetchId() {
      setOddsLoading(true)
      fetch(
        `https://api.bettingpros.com/v3/events?sport=${game.toUpperCase()}`,
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
          if (data.events.length > 0) {
            if (Object.keys(teams).length !== 0) {
              let event = data.events.find(
                (item) =>
                  item.participants[1].id === teams.awayTeam?.nameCode &&
                  item.participants[0].id === teams.homeTeam?.nameCode
              );
              if (event.id){
                setOddsLoading(false)
                setNotFound(false)
                setEventInfo(event);
                fetchData(event?.id);
              } else {
                setNotFound(true)
              }
            }
          } else {
            setNotFound(true)
            setEventInfo(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function fetchData(id) {
      const marketIds = { NBA: 129, NFL: 3, MLB: 122, NHL: 195 };
      fetch(
        `https://api.bettingpros.com/v3/offers?picks=true&sport=${game}&market_id=${
          marketIds[game.toUpperCase()]
        }&location=INT&event_id=${id}`,
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
          if (data) {
            setOdds(data.offers[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, game]);

  return (
    <main className="min-h-screen bg-blue-50">
      {HeadTOHead ? (
        <HeadToHead {...HeadTOHead} />
      ) : (
        <div className="py-10">
          <Loader />
        </div>
      )}
      <section className="max-w-4xl mx-auto">
        <Filters selectedFilter={selectedFilter} changeFilter={setFilter} />
        <GameOdds oddsLoading={oddsLoading} notFound={notFound} game={game} eventInfo={eventInfo} odds={odds} />
        <RelatedArticles />
      </section>
    </main>
  );
}
