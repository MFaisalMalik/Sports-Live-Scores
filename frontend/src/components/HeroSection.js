import React from "react";
import "../App.css";
import "./HeroSection.css";
import ChevronDownIcon from "./commons/ChevronDownIcon";

function HeroSection() {
  return (
    <div className="w-full bg-[url('/public/images/Banner.jpg')] bg-cover bg-no-repeat bg-center min-h-[90vh] ">
      <div className="w-full h-full min-h-[90vh] bg-black/70">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10 relative flex w-full h-full min-h-[90vh] flex-col justify-center items-center ">
          <a
            href="#cards-container"
            className="absolute bottom-6 text-white animate-bounce text-2xl"
          >
            <ChevronDownIcon className="w-6 h-6" />
          </a>
          <div className="max-w-3xl">
            <h1 className="mb-6 text-3xl font-extrabold leading-none tracking-normal text-white md:text-6xl md:tracking-tight">
              Utilize{" "}
              <span className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400 lg:inline">
                AI-driven insights
              </span>{" "}
              to transform data into{" "}
              <span className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400 lg:inline">
                winning strategies.
              </span>
            </h1>
            <p className="px-0 mb-6 text-lg font-semibold text-center text-gray-200 md:text-xl lg:px-24">
              Take the uncertainty out of your betting with our expertly
              researched picks across MLB, NBA, NHL, and NFL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
