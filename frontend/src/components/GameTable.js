import { useEffect, useState } from "react";
import React from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from "@mui/material";

export default function GameTable(props) {

    const headerCellStyles = {
        color: "#465e84",
        fontWeight: "bold",
        border: "1px solid #cbd6e8",
        backgroundColor: "#e1eaf0",
    };

    const cellStyles = {
        border: "1px solid #cbd6e8",
    };

    const [gameStats, setGameStats] = useState(null);

    useEffect(() => {
      const fetchGameStats = async () => {
        const response = await fetch("http://localhost:5000/api/games");

        if (response.ok) {
          const json = await response.json();
          setGameStats(json);
        }
      };
      fetchGameStats();
    }, []);

    return (
        <div className="parties">
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
                        {gameStats &&
                            gameStats.
                            filter((game) => game.type === props.gameType).
                            map((game) => (
                                <TableRow key={game.id}>
                                    <TableCell align="center" sx={cellStyles}>
                                        {game.game}
                                    </TableCell>
                                    <TableCell align="center" sx={cellStyles}>
                                        {game.bet}
                                    </TableCell>
                                    <TableCell align="center" sx={cellStyles}>
                                        {game.market}
                                    </TableCell>
                                    <TableCell align="center" sx={cellStyles}>
                                        {game.expectedValue}
                                    </TableCell>
                                    <TableCell align="center" sx={cellStyles}>
                                        {game.winProbability}
                                    </TableCell>
                                    <TableCell align="center" sx={cellStyles}>
                                        {game.sharpOdds}
                                    </TableCell>
                                    <TableCell align="center" sx={cellStyles}>
                                        {game.currentOdds}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
