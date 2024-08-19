import React from "react";
import { Button } from './Button';

function PackageCard(props) {
  return (
    <>
      <li className="cards__item">
        <div className="cards__item__link package_item">
            <p className="package__name">{props.name}</p>
            <p className="package__price">{props.price}</p>
            <Button name= 'select' buttonStyle='btn--rounded' buttonSize='btn--large' href='/register'>Select</Button>            
        </div>
      </li>
    </>
  );
}

export default PackageCard;
