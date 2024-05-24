import React from "react";
import PackageCard from "../PackageCard";
import TickIcon from "../commons/TickIcon";
import "../Cards.css";
import "./Packages.css";
import { Link } from "react-router-dom";

function Packages() {
  return (
    <>
      <section className="max-w-7xl px-4 pt-24 pb-12 mx-auto">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="block pb-2 mb-5 text-4xl font-extrabold leading-none tracking-normal text-transparent md:text-6xl md:tracking-tight bg-clip-text bg-gradient-to-r from-blue-800 to-purple-700">
          Join Simplicity Sport Bets!
          </h1>
          <p className="px-0 mb-10 text-lg text-gray-500 md:text-xl lg:px-24">
          Ensuring an enjoyable experience, and, of course, providing everyone with quality sports picks.
          </p>
        </div>
        <div className="w-full mx-auto xl:w-4/5">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8">
            <div className="border-0 rounded-none shadow-none card sm:rounded-lg md:border">
              <div className="flex flex-col justify-between p-6 border-b border-gray-200">
                <p className="mb-1 text-lg font-semibold text-yellow-600">
                  Free
                </p>
                <p className="pb-0 my-2 font-mono text-4xl font-extrabold text-gray-900">
                  $0
                </p>
                <p className="text-sm text-gray-500">1 Week Pass</p>
                <Link to="/sign-up" className="w-full mt-6 btn btn-warning btn-lg">
                  Get started for free &rarr;
                </Link>
              </div>
              <ul className="flex flex-col flex-grow p-6 space-y-3">
                <li className="flex items-start">
                  <TickIcon />
                  <span className="text-gray-700"> Unlimited feedback </span>
                </li>
                <li className="flex items-start">
                  <TickIcon />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="The person who manages the feedback for the product."
                  >
                    One manager
                  </span>
                </li>
                <li className="flex items-start">
                  <TickIcon />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="User is the person who submits the feedback. We are not counting the people who are upvoting features."
                  >
                    1000 submitters
                  </span>
                </li>
                <li className="flex items-start">
                  <TickIcon />
                  <span className="text-gray-700">Unlimited Private Boards</span>
                </li>
                <li className="flex items-start">
                  <TickIcon />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="User is the person who submits the feedback. We are not counting the people who are upvoting features."
                  >
                    Custom domains support
                  </span>
                </li>
                <li className="flex items-start">
                  <TickIcon />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="Support for German, French, Polish and more."
                  >
                    Multi-language Support
                  </span>
                </li>
                <li className="flex items-start">
                  <TickIcon />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="Manage your customer feedback at the comfort of your phone. On iOS and Android."
                  >
                    Free iOS and Android apps
                  </span>
                </li>
                <li className="flex items-start">
                  <TickIcon />
                  <span className="text-gray-700">3 Integrations</span>
                </li>
                <li className="flex items-start">
                  <TickIcon />
                  <span className="text-gray-700">New features every 14 days</span>
                </li>
              </ul>
            </div>
            <div className="border-0 rounded-none shadow-none card sm:rounded-lg md:border">
              <div className="flex flex-col justify-between p-6 border-b border-gray-200">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="mb-1 text-lg font-semibold text-purple-700">
                      Premium
                    </p>
                    <span className="badge bg-primary-light text-primary">
                      Most popular
                    </span>
                  </div>
                  <p className="my-2 font-mono text-4xl font-extrabold text-gray-900">
                    $19.99
                  </p>
                  <p className="text-sm text-gray-500">1 Month Pass</p>
                </div>
                <Link to="/sign-up" className="w-full mt-6 btn btn-primary btn-lg">
                  Select &rarr;
                </Link>
              </div>
              <ul className="flex flex-col flex-grow p-6 space-y-3">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-4 h-4 mt-1 mr-2 text-purple-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-purple-700">
                    Everything in Free
                  </span>
                </li>
                <li className="flex items-start">
                  <TickIcon colorclassName="text-purple-700" />
                  Unlimited feedback
                </li>
                <li className="flex items-start">
                   <TickIcon colorclassName="text-purple-700" />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="The person who manages the feedback for the product."
                  >
                    10 manager
                  </span>
                </li>
                <li className="flex items-start">
                   <TickIcon colorclassName="text-purple-700" />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="User is the person who submits the feedback. We are not counting the people who are upvoting features."
                  >
                    7500 submitters
                  </span>
                </li>
                <li className="flex items-start">
                   <TickIcon colorclassName="text-purple-700" />
                  <span>Unlimited Integrations</span>
                </li>
                <li className="flex items-start">
                   <TickIcon colorclassName="text-purple-700" />
                  Humane support
                </li>
              </ul>
            </div>
            <div className="border-0 rounded-none shadow-none card sm:rounded-lg md:border">
              <div className="flex flex-col justify-between p-6 border-b border-gray-200">
                <div>
                  <p className="mb-1 text-lg font-semibold text-pink-600">
                    Premium Gold
                  </p>
                  <p className="my-2 text-4xl font-bold font-mono text-gray-900">$199.99</p>
                  <p className="text-sm text-gray-500">1 Year Pass</p>
                </div>
                <Link to="/sign-up" className="w-full mt-6 btn btn-light btn-lg">
                  Select &rarr;
                </Link>
              </div>
              <ul className="flex flex-col flex-grow p-6 space-y-3">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-4 h-4 mt-1 mr-2 text-pink-600"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-pink-600">
                    Everything in Premium
                  </span>
                </li>
                <li className="flex items-start">
                   <TickIcon colorclassName="text-pink-700" />
                  Unlimited feedback
                </li>
                <li className="flex items-start">
                   <TickIcon colorclassName="text-pink-700" />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="The person who manages the feedback for the product."
                  >
                    Unlimited manager
                  </span>
                </li>
                <li className="flex items-start">
                   <TickIcon colorclassName="text-pink-700" />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="User is the person who submits the feedback. We are not counting the people who are upvoting features."
                  >
                    Unlimited submitters
                  </span>
                </li>
                <li className="flex items-start">
                   <TickIcon colorclassName="text-pink-700" />

                  <span className="text-gray-700">Unlimited Integrations</span>
                </li>
                <li className="flex items-start">
                   <TickIcon colorclassName="text-pink-700" />

                  <span
                    className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
                    x-data="tooltip()"
                    x-spread="tooltip"
                    x-position="top"
                    title="Access to developers to build custom features and changes for your enterprise."
                  >
                    Feature on-request
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="cards packages">
        <h1>JOIN SIMPLICITY SPORT BETS!</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              <PackageCard name="7 Days Pass" price="Free" path="/sign-up" />

              <PackageCard name="1 Month Pass" price="$19.99" path="/sign-up" />

              <PackageCard name="1 Year Pass" price="$199.99" path="/sign-up" />
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Packages;
