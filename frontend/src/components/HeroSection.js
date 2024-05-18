import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { useAuth } from '../contexts/authContext';

function HeroSection() {
  const { userLoggedIn } = useAuth();

  return (
    <div className='hero-container'>
      { !userLoggedIn &&
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            to='/sign-in'
          >
            SIGN IN
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            to='/packages'
          >
            SIGN UP
          </Button>
        </div>
      }
    </div>
  );
}

export default HeroSection;
