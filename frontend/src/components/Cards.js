import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import { Baseball, Hockey, basketball, football } from "@/assets/images";

function Cards() {
  return (
    <>
      <div className="bg-blue-100">
        <div
          id="cards-container"
          className="container mx-auto justify-center px-4 md:px-8 lg:px-12 pt-10 pb-20"
        >
          <h2 className="font-bold text-4xl">Best Picks!</h2>
          <ul className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardItem
              image={football}
              text="Football"
              path="/games/football"
              id="left-card"
            />
            <CardItem
              image={Baseball}
              text="Baseball"
              path="/games/baseball"
            />
            <CardItem
              image={basketball}
              text="Basketball"
              path="/games/basketball"
              id="left-card"
            />
            <CardItem
              image={Hockey}
              text="Hockey"
              path="/games/hockey"
            />
          </ul>
        </div>
      </div>
    </>
  );
}

export default Cards;
