import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { auth } from "../firebase/firebase";

export default function PlayerTable() {
  const { gameType, requestType } = useParams();
  const [playerStats, setPlayerStats] = useState(null);
  const gamesCodes = {
    Baseball: "MLB",
    Basketball: "NBA",
    Football: "NFL",
    Hockey: "NHL",
  };

  useEffect(() => {
    const fetchPlayerStats = async () => {
      let url = `${
        process.env.REACT_APP_API_HOST
      }/api/games/players/${requestType}/${gamesCodes[gameType] || "MLB"}`;

      if (requestType === "premium" && auth.currentUser) {
        const userId = auth.currentUser.uid;
        url += `?userId=${userId}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setPlayerStats(json.data);
      }
    };
    fetchPlayerStats();
  }, []);

  const headerCellStyles = {
    color: "#465e84",
    fontWeight: "bold",
    border: "1px solid #cbd6e8",
    backgroundColor: "#e1eaf0",
  };

  const cellStyles = {
    border: "1px solid #cbd6e8",
  };

  return (
    <main className="">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mt-6 mb-4">
          {`${gameType}`} Player Stats
        </h1>
        <div>
          <TableContainer className="table-container" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={headerCellStyles}>
                    Player
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyles}>
                    Team
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyles}>
                    Bet
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyles}>
                    Market
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyles}>
                    Expected Value
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyles}>
                    Win Probability
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyles}>
                    Sharp Odds
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyles}>
                    Currrent Odds
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playerStats &&
                  playerStats.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell align="center" sx={cellStyles}>
                        {game.Player}
                      </TableCell>
                      <TableCell align="center" sx={cellStyles}>
                        {game.Team}
                      </TableCell>
                      <TableCell align="center" sx={cellStyles}>
                        {game.Bet}
                      </TableCell>
                      <TableCell align="center" sx={cellStyles}>
                        {game.Market}
                      </TableCell>
                      <TableCell align="center" sx={cellStyles}>
                        {game["Expected Value"]}
                      </TableCell>
                      <TableCell align="center" sx={cellStyles}>
                        {game["Win Probability"]}
                      </TableCell>
                      <TableCell align="center" sx={cellStyles}>
                        {game["Sharp Odds"]}
                      </TableCell>
                      <TableCell align="center" sx={cellStyles}>
                        {game["Current Odds"]}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </main>
  );
}
