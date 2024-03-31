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
              path='/services'
            />
            <CardItem
              src='images/Baseball.jpg'
              text='Baseball'            
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/Basketball.jpg'
              text='Basketball'             
              path='/services'
            />
            <CardItem
              src='images/Hockey.jpg'
              text='Hockey'
              path='/service'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
