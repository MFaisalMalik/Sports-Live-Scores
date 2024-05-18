import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Blogs from './components/pages/Blog';
import LiveScores from './components/pages/LiveScores';
import SignUp from './components/pages/SignUp';
import BettingOdds from './components/pages/BettingOdds';
import SignIn from './components/pages/SignIn';
import Football from './components/pages/Football';
import Baseball from './components/pages/Baseball';
import Basketball from './components/pages/Basketball';
import Hockey from './components/pages/Hockey';
import Packages from './components/pages/Packages';
import BaseballGameStats from './components/pages/BaseballGameStats';
import BasketballGameStats from './components/pages/BasketballGameStats';
import HockeyGameStats from './components/pages/HockeyGameStats';
import FootballGameStats from './components/pages/FootballGameStats';
import { AuthProvider } from './contexts/authContext';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/blog' component={Blogs} />
          <Route path='/live-scores' component={LiveScores} />
          <Route path='/betting-odds' component={BettingOdds} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/packages' component={Packages} />
          <Route path='/football' component={Football} />
          <Route path='/baseball' component={Baseball} />
          <Route path='/basketball' component={Basketball} />
          <Route path='/hockey' component={Hockey} />
          <Route path='/baseball-game-stats' component={BaseballGameStats} />
          <Route path='/basketball-game-stats' component={BasketballGameStats} />
          <Route path='/hockey-game-stats' component={HockeyGameStats} />
          <Route path='/football-game-stats' component={FootballGameStats} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
