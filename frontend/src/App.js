import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./components/pages/Blog";
import LiveScores from "./components/pages/LiveScores";
import SignUp from "./components/pages/SignUp";
import BettingOdds from "./components/pages/BettingOdds";
import SignIn from "./components/pages/SignIn";
import Football from "./components/pages/Football";
import Baseball from "./components/pages/Baseball";
import Basketball from "./components/pages/Basketball";
import Hockey from "./components/pages/Hockey";
import Packages from "./components/pages/Packages";
import BaseballGameStats from "./components/pages/BaseballGameStats";
import BasketballGameStats from "./components/pages/BasketballGameStats";
import HockeyGameStats from "./components/pages/HockeyGameStats";
import FootballGameStats from "./components/pages/FootballGameStats";
import { AuthProvider } from "./contexts/authContext";
import ScrollToTop from "./components/commons/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/live-scores" element={<LiveScores />} />
          <Route path="/betting-odds" element={<BettingOdds />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/football" element={<Football />} />
          <Route path="/baseball" element={<Baseball />} />
          <Route path="/basketball" element={<Basketball />} />
          <Route path="/hockey" element={<Hockey />} />
          <Route path="/baseball-game-stats" element={<BaseballGameStats />} />
          <Route
            path="/basketball-game-stats"
            element={<BasketballGameStats />}
          />
          <Route path="/hockey-game-stats" element={<HockeyGameStats />} />
          <Route path="/football-game-stats" element={<FootballGameStats />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
