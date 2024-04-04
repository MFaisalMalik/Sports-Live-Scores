import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these FREE live scores!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/Football.jpg'
              text='Football'
              path='/football'
              id = 'left-card'
            />
            <CardItem
              src='images/Baseball.jpg'
              text='Baseball'            
              path='/baseball'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/Basketball.jpg'
              text='Basketball'             
              path='/basketball'
              id = 'left-card'
            />
            <CardItem
              src='images/Hockey.jpg'
              text='Hockey'
              path='/hockey'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
