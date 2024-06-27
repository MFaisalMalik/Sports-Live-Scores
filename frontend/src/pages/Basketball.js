import React from "react";
import "../App.css";
import Footer from "../components/Footer2";
import "./GamePages.css";
import { Link } from "react-router-dom";

export default function Basketball() {
  return (
    <>
      <div className="h-[400px] bg-[url('/public/images/basketball-cover.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="w-full h-full bg-black/40 flex items-center">
          <div className="container mx-auto px-10 ">
            <h1 className="font-bold text-left text-white text-3xl sm:text-4xl lg:text-7xl">
              BASKETBALL
            </h1>
          </div>
        </div>
      </div>
      <section className="bg-blue-100 ">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
          <h2 className="block pb-2 mb-5 text-2xl text-center font-extrabold leading-none tracking-normal text-transparent md:text-4xl md:tracking-tight bg-clip-text bg-gradient-to-r from-blue-800 to-purple-700">
            Ready to Make Your Move? Explore Bets!
          </h2>
          <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/basketball-game-stats">
              <div className="relative group">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 group-hover:mt-[2px] group-hover:ml-[2px] transition-all bg-indigo-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <span className="text-blue-700">Free</span>
                  <div className="mt-2 flex justify-between ">
                    <h3 className="text-lg font-bold text-gray-800">Game Bets</h3>
                    <span className=" rounded-md text-indigo-500 font-semibold">
                      Search
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/sign-in">
              <div className="relative group">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 group-hover:mt-[2px] group-hover:ml-[2px] transition-all bg-indigo-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <span className="text-blue-700">Free</span>
                  <div className="mt-2 flex justify-between ">
                    <h3 className="text-lg font-bold text-gray-800">Player Bets</h3>
                    <span className=" rounded-md text-indigo-500 font-semibold">
                      Search
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/sign-in">
              <div className="relative group">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 group-hover:mt-[2px] group-hover:ml-[2px] transition-all bg-indigo-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <span className="text-purple-700">Premium</span>
                  <div className="mt-2 flex justify-between ">
                    <h3 className="text-lg font-bold text-gray-800">Game Bets</h3>
                    <span className=" rounded-md text-purple-500 font-semibold">
                      Search
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/sign-in">
              <div className="relative group">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 group-hover:mt-[2px] group-hover:ml-[2px] transition-all bg-indigo-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <span className="text-purple-700">Premium</span>
                  <div className="mt-2 flex justify-between ">
                    <h3 className="text-lg font-bold text-gray-800">Game Bets</h3>
                    <span className=" rounded-md text-purple-500 font-semibold">
                      Search
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
