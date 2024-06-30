import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import SignUp from "./pages/SignUp";
import LiveScores from "./pages/LiveScores";
import SignIn from "./pages/SignIn";
import Football from "./pages/Football";
import Baseball from "./pages/Baseball";
import Basketball from "./pages/Basketball";
import Hockey from "./pages/Hockey";
import Pricing from "./pages/Pricing";
import BaseballGameStats from "./pages/BaseballGameStats";
import BasketballGameStats from "./pages/BasketballGameStats";
import HockeyGameStats from "./pages/HockeyGameStats";
import FootballGameStats from "./pages/FootballGameStats";
import { AuthProvider } from "./contexts/authContext";
import ScrollToTop from "./components/commons/ScrollToTop";
import Article from "./pages/Article";
import AdminSidebar from "./components/admin/AdminSidebar";
import Default from "./pages/admin/Default";
import AddNewBlog from "./pages/admin/AddNewBlog";
import EditBlog from "./pages/admin/EditBlog";
import { ToastContainer } from "react-toastify";
import BettingOds from "./pages/BettingOdds";
import MatchUp from "./pages/MatchUp";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/admin" element={<AdminSidebar />}>
            <Route path="default" element={<Default />} />
            <Route path="add-new-blog" element={<AddNewBlog />} />
            <Route path="edit-blog/:blogSlug" element={<EditBlog />} />
          </Route>
          <Route path="/blogs/:blogSlug" element={<Article />} />
          <Route path="/live-scores" element={<LiveScores />} />
          <Route path="/:game/odds" element={<BettingOds />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/pricing" element={<Pricing />} />
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
          <Route path="/:game/matchup/:slug/:id" element={<MatchUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
