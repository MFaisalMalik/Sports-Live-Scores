import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';
import './Navbar.css';

function Navbar() {
  const { userLoggedIn } = useAuth();
  const history = useHistory();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src='/images/logo.ico' alt='icon'></img>
            SIMPLICITY SPORT BETS
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/blog'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/live-scores'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Live Scores
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/betting-odds'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Betting Odds
              </Link>
            </li>

            {userLoggedIn ? (
              <li>
                <Link
                  to="/"
                  id="nav-links-mobile-sign-out"
                  className="nav-links-mobile"
                  onClick={() => {
                    doSignOut()
                      .then(() => {
                        history.push('/', true);
                        closeMobileMenu();
                      });
                  }}
                >
                  Sign Out
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/sign-in"
                    id="nav-links-mobile-sign-in"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages"
                    id="nav-links-mobile-sign-up"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>

          {button && (
            userLoggedIn ? (
              <Button
                name="sign-out"
                buttonStyle="btn--outline"
                onClick={() => {
                  doSignOut()
                    .then(() => history.push('/', true));
                }}
              >
                SIGN OUT
              </Button>
            ) : (
              <>
                <Button name="sign-in" buttonStyle="btn--outline" to="/sign-in">
                  SIGN IN
                </Button>
                <Button name="sign-up" buttonStyle="btn--outline" to="/packages">
                  SIGN UP
                </Button>
              </>
            )
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
