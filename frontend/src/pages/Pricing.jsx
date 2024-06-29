import React from "react";
import TickIcon from "../components/commons/TickIcon";
import "../components/Cards.css";
import "./Pricing.css";
import { Link } from "react-router-dom";
import PayPalButton from "../components/PaypalButton";
import Footer from "../components/Footer2";

const packages = [
  {
    name: "Free",
    price: 0,
    duration: "1 Week Pass",
    features: [
      "Unlimited feedback",
      "One manager",
      "1000 submitters",
      "Unlimited Private Boards",
      "Custom domains support",
      "Multi-language Support",
      "Free iOS and Android apps",
      "3 Integrations",
      "New features every 14 days",
    ],
  },
  {
    name: "Premium",
    price: 19.99,
    duration: "1 Month Pass",
    primaryColorClass: "text-purple-700",
    tag: "Most popular",
    features: [
      "Unlimited feedback",
      "10 managers",
      "7500 submitters",
      "Unlimited Integrations",
      "Humane support",
    ],
  },
  {
    name: "Premium Gold",
    price: 199.99,
    duration: "1 Year Pass",
    primaryColorClass: "text-pink-700",
    features: [
      "Unlimited feedback",
      "Unlimited managers",
      "Unlimited submitters",
      "Unlimited Integrations",
      "Feature on-request",
    ],
  },
];

function Pricing() {
  return (
    <>
      <section className="max-w-7xl px-4 pt-24 pb-12 mx-auto">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="block pb-2 mb-5 text-4xl font-extrabold leading-none tracking-normal text-transparent md:text-6xl md:tracking-tight bg-clip-text bg-gradient-to-r from-blue-800 to-purple-700">
            Join Simplicity Sport Bets!
          </h1>
          <p className="px-0 mb-10 text-lg text-gray-500 md:text-xl lg:px-24">
            Ensuring an enjoyable experience, and, of course, providing everyone
            with quality sports picks.
          </p>
        </div>
        <div className="w-full mx-auto xl:w-4/5">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8">
            {packages.map((item, i) => {
              return (
                <div
                  key={item.name}
                  className="border-0 rounded-none shadow-none card sm:rounded-lg md:border"
                >
                  <div className="flex flex-col justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <p
                        className={`mb-1 text-lg font-semibold ${item.primaryColorClass}`}
                      >
                        {item.name}
                      </p>
                      {item.tag && (
                        <span className="badge bg-primary-light text-primary">
                          Most popular
                        </span>
                      )}
                    </div>
                    <p className="pb-0 my-2 font-mono text-4xl font-extrabold text-gray-900">
                      ${item.price}
                    </p>
                    <p className="text-sm text-gray-500">{item.duration}</p>
                    {Number(item.price) === 0 ? (
                      <Link to="/sign-up" className="w-full mt-6">
                        <span>Get started for free &rarr;</span>
                      </Link>
                    ) : (
                      <div className="mt-4">
                        <PayPalButton />
                      </div>
                    )}
                  </div>
                  <ul className="flex flex-col flex-grow p-6 space-y-3">
                    {i > 0 && (
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`flex-none w-4 h-4 mt-1 mr-2 ${item.primaryColorClass}`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span
                          className={`font-medium ${item.primaryColorClass}`}
                        >
                          Everything in {packages[i - 1].name}
                        </span>
                      </li>
                    )}
                    {item.features.map((feature) => {
                      return (
                        <li key={feature} className="flex items-start">
                          <TickIcon colorClass={item.primaryColorClass} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Pricing;
