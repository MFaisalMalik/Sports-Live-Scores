import React from 'react';
import PackageCard from '../PackageCard';
import '../Cards.css';
import './Packages.css';

function Packages() {
    return (
      <div className='cards packages'>
        <h1>JOIN SIMPLICITY SPORT BETS!</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <PackageCard
                name='7 Days Pass'
                price='Free'
                path='/sign-up'
              />

              <PackageCard
                name='1 Month Pass'
                price='$19.99'           
                path='/sign-up'
              />

              <PackageCard
                name='1 Year Pass'
                price='$199.99'           
                path='/sign-up'
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default Packages;
  