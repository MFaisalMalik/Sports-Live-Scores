import React from "react";
import { Link } from "react-router-dom";

function CardItem(props) {
  return (
    <>
      <li
        id={props.id}
        className="group hover:-translate-y-2 transition duration-500 ease-in-out rounded-xl bg-white"
      >
        <Link className="relative cards__item__link" to={props.path}>
          <figure className="cards__item__pic-wrap">
            <img
              className="cards__item__img group-hover:scale-105 transition-all ease-in duration-300"
              alt={`${props.text}`}
              src={props.src}
            />
          </figure>
          <div className="absolute bottom-0 w-full flex items-center justify-center p-4 bg-gradient-to-t from-black to-transparent">
            <h5 className="text-center text-white text-xl group-hover:text-2xl transition-all duration-300 ease-in-out font-bold tracking-wide">
              {props.text}
            </h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
