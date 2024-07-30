import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import SignUp from "./pages/SignUp";
import LiveScores from "./pages/LiveScores";
import SignIn from "./pages/SignIn";
import Pricing from "./pages/Pricing";
import Games from "./pages/Games";
import GameTable from "./pages/GameTable";
import PlayerTable from "./pages/PlayerTable";
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
import { ModalContextProvider } from "./contexts/modalContext";
import EmailVerifyModal from "./components/commons/EmailVerifyModal";
import CancelSubModal from "./components/commons/CancelSubVerifyModal";
import Subscription from "./pages/user/Subscription";
import PaymentSuccess from "./pages/user/PaymentSuccess";
import PaymentError from "./pages/user/PaymentError";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <ModalContextProvider>
          <BrowserRouter>
            <Navbar />
            <ScrollToTop />
            <ToastContainer />
            <EmailVerifyModal />
            <CancelSubModal />
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
              <Route path="/games/:gameType" element={<Games />} />
              <Route
                path="/games-stats/:gameType/:requestType"
                element={<GameTable />}
              />
              <Route
                path="/players-stats/:gameType/:requestType"
                element={<PlayerTable />}
              />
              <Route path="/:game/matchup/:slug/:id" element={<MatchUp />} />
              <Route path="/user/subscription" element={<Subscription />} />
              <Route
                path="/success-subscription"
                element={<PaymentSuccess />}
              />
              <Route path="/cancel-subscription" element={<PaymentError />} />
            </Routes>
          </BrowserRouter>
        </ModalContextProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
