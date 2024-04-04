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



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/blog' component={Blogs} />
          <Route path='/live-scores' component={LiveScores} />
          <Route path='/betting-odds' component={BettingOdds} />
          <Route path='/Sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/football' component={Football} />
          <Route path='/baseball' component={Baseball} />
          <Route path='/basketball' component={Basketball} />
          <Route path='/hockey' component={Hockey} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
