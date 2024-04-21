import React from 'react';
import '../../App.css';
import { Button } from "../Button";
import Footer from "../Footer";
import './GamePages.css';

export default function Basketball() {
  return (
    <>
      <h1 className="basketball">BASKETBALL</h1>
      <div className="container">
        <div className="categories">
          <div className="row">
            <div className="col-3">
              <div className="game-bets-free">
                <h2 className="text-class-2">Free Game Bets</h2>
                <Button
                  className="btns"
                  buttonStyle="btn--primary"
                  buttonSize="btn--large"
                  to="/sign-in"
                  name="search"
                >
                  SEARCH
                </Button>
              </div>
            </div>

            <div className="col-3">
              <div className="players-bets-free">
                <h2 className="text-class-2">Free Players Bets</h2>
                <Button
                  className="btns"
                  buttonStyle="btn--primary"
                  buttonSize="btn--large"
                  to="/sign-in"
                  name="search-player-free"
                >
                  SEARCH
                </Button>
              </div>
            </div>

            <div className="col-3">
              <div className="game-bets-premium">
                <h2 className="text-class">Premium Game Bets</h2>
                <Button
                  className="btns"
                  buttonStyle="btn--primary"
                  buttonSize="btn--large"
                  to="/sign-in"
                  name="search-premium"
                >
                  SEARCH
                </Button>
              </div>
            </div>

            <div className="col-3">
              <div className="palyer-bets-premium">
                <h2 className="text-class">Premium Players Bets</h2>
                <Button
                  className="btns"
                  buttonStyle="btn--primary"
                  buttonSize="btn--large"
                  to="/sign-in"
                  name="search-premium"
                >
                  SEARCH
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}