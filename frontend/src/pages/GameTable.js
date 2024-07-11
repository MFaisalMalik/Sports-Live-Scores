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

export default function GameTable() {
  const { gameType, requestType } = useParams();
  const [gameStats, setGameStats] = useState(null);
  const gamesCodes = {
    Baseball: "MLB",
    Basketball: "NBA",
    Football: "NFL",
    Hockey: "NHL",
  };

  useEffect(() => {
    const fetchGameStats = async () => {
      let url = `${process.env.REACT_APP_API_HOST}/api/games/${requestType}/${gamesCodes[gameType || "MLB"]}`;

      if (requestType === "premium" && auth.currentUser) {
        const userId = auth.currentUser.uid;
        url += `?userId=${userId}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setGameStats(json.data);
      }
    };
    fetchGameStats();
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
          {`${gameType}`} Game Stats
        </h1>
        <div>
          <TableContainer className="table-container" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={headerCellStyles}>
                    Game
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
                {gameStats && gameStats.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell align="center" sx={cellStyles}>
                        {game.Game}
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
