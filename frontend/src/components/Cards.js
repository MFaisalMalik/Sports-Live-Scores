import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <>
      <div className="bg-blue-100">
        <div
          id="cards-container"
          className="container mx-auto justify-center px-4 md:px-8 lg:px-12 pt-10 pb-20"
        >
          <h2 className="font-bold text-4xl">Live Scores!</h2>
          <ul className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardItem
              src="images/Football.jpg"
              text="Football"
              path="/football"
              id="left-card"
            />
            <CardItem
              src="images/Baseball.jpg"
              text="Baseball"
              path="/baseball"
            />
            <CardItem
              src="images/Basketball.jpg"
              text="Basketball"
              path="/basketball"
              id="left-card"
            />
            <CardItem src="images/Hockey.jpg" text="Hockey" path="/hockey" />
          </ul>
        </div>
      </div>
    </>
  );
}

export default Cards;
