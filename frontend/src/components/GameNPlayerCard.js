import React from "react";
import { Link, useParams } from "react-router-dom";

export default function GameNPlayerCard(props) {
  return (
    <Link to={props.link}>
      <div className="relative group">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 group-hover:mt-[2px] group-hover:ml-[2px] transition-all bg-indigo-500 rounded-lg"></span>
        <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
          <span className="text-blue-700">{props.requestType}</span>
          <div className="mt-2 flex justify-between ">
            <h3 className="text-lg font-bold text-gray-800">{props.bet} Bets</h3>
            <span className=" rounded-md text-indigo-500 font-semibold">
              Search
            </span>
          </div>
          <p className="mt-2 text-gray-400 font-medium text-sm p-2 bg-blue-50 rounded-lg">{props.tagline}</p>
        </div>
      </div>
    </Link>
  );
}