import React from 'react';
import '../../App.css';
import { Button } from '../Button';
import Footer from '../Footer';

export default function Football() {
  return ( 
    <>
        <h1 className='football'>FOOTBALL</h1>
        <div className='container'>
            <div className='game-container'>
                <h2 className='game-bets'>Top Game Bets</h2>
                <Button
                className='btns'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
                to='/sign-in'
                name='search'
                >
                SEARCH
                </Button>
            </div>
        </div>
        <Footer/>
    </>
  )
}
