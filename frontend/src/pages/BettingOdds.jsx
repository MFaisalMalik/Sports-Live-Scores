import React, { useState } from 'react'
import Header from '../components/BettingOdds/Header';
import OddsTables from '../components/BettingOdds/OddsTables';
import { useNavigate, useParams } from 'react-router-dom';

const gameList = ["NFL", "MLB", "NBA", "NHL"];
const oddsList = ["Moneyline", "Total Runs", "Run Line"];

export default function BettingOds() {
  // const [match, setMatch] = useState("NFL");
  const [odds, setOdds] = useState("Moneyline");
  const params = useParams();
  const navigate = useNavigate()
  const game = params.game.toLocaleUpperCase()

  const handleGameChange = (game) => {
    navigate(`/${game.toLowerCase()}/odds`)
  } 


  return (
    <main className="bg-blue-50 min-h-screen">
      <Header gameList={gameList} game={game} setGame={handleGameChange} oddsList={oddsList} odds={odds} setOdds={setOdds} />
      <OddsTables game={game} />
    </main>
  );
}
