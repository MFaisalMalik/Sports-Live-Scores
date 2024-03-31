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
        </Switch>
      </Router>
    </>
  );
}

export default App;
