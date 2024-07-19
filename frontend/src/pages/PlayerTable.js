import { useCallback, useEffect, useState } from "react";
import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
} from "@mui/material";
import { auth } from "../firebase/firebase";
import { apiHost, siteHost } from "../utils";
import { Loader } from "./LiveScores";

export default function PlayerTable() {

  const { gameType, requestType } = useParams();
  const [playerStats, setPlayerStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [afterThis, setAfterThis] = useState(null);
  const [beforeThis, setBeforeThis] = useState(null);
  const [count, setCount] = useState(0);
  const [pageAction, setPageAction] = useState("NEXT");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchPlayerStats = useCallback(async () => {
    const gamesCodes = {
      baseball: "MLB",
      basketball: "NBA",
      football: "NFL",
      hockey: "NHL",
    };
    let url = new URL(
      `${apiHost}/api/games/players/${requestType}/${
        gamesCodes[gameType] || "MLB"
      }`
    );
    let params = new URLSearchParams(url.search);
    if (requestType === "premium" && auth.currentUser) {
      const userId = auth.currentUser.uid;
      params.set("userId", userId);
    }
    if (currentPage > 0) {
      params.set("page", currentPage + 1);
      params.set("page_action", pageAction);
    }
    if (rowsPerPage !== 5) {
      params.set("per_page", rowsPerPage);
    }
    if (afterThis) {
      params.set("after_this", afterThis);
    }
    if (beforeThis) {
      params.set("before_this", beforeThis);
    }
    // console.log(rowsPerPage, currentPage);

    let formedUrl = new URL(`${url.origin}${url.pathname}?${params}`).href;
    const response = await fetch(formedUrl);
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      setAfterThis(json.afterThis);
      setBeforeThis(json.beforeThis);
      setPlayerStats(json.data);
      setCount(json.count);
    }
  }, [currentPage, gameType, pageAction, requestType, rowsPerPage]);

  useEffect(() => {
    fetchPlayerStats();
  }, [fetchPlayerStats, rowsPerPage, currentPage]);

  function handlePageChange(page) {
    if (page > currentPage) {
      setPageAction("NEXT");
    } else {
      setPageAction("PREVIOUS");
    }
    setCurrentPage(page);
  }

  const headerCellStyles = {
    color: "#eff6ff",
    fontWeight: "bold",
    border: "1px solid #eff6ff",
    backgroundColor: "var(--navbar-color)",
    borderCollapse: "collapse",
  };

  const cellStyles = {
    border: "1px solid #eff6ff",
    fontSize: 14,
    fontWeight: "bold",
    color: "#4b5563",
  };

  const perPageOptions = [5, 10, 20, 50]
    .filter((num) => count >= num)
    .map((num) => num);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mt-6 mb-4">
          {`${gameType.at(0).toUpperCase() + gameType.slice(1)}`} Player Stats
        </h1>
        <div>
          {playerStats ? (
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
                  {playerStats.map((game) => (
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
              {
                requestType === "premium" && (
                  <TablePagination
                    rowsPerPage={rowsPerPage}
                    count={count}
                    page={currentPage}
                    onPageChange={(_, page) => handlePageChange(page)}
                    rowsPerPageOptions={perPageOptions}
                    onRowsPerPageChange={({ target }) =>
                      setRowsPerPage(target.value)
                    }
                    component="div"
                  />
                )
              }
            </TableContainer>
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
