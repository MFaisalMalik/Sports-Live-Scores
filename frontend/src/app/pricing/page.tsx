"use client";

import React, { useEffect, useState } from "react";
import TickIcon from "@/components/commons/TickIcon";
import Link from "next/link";
import PayPalButton from "@/components/PaypalButton";

import { apiHost, siteHost } from "@/utils";
import { auth } from "@/firebase/firebase";
import { toast } from "react-toastify";
import Loader from "@/components/livescores/Loader";

const myPackages = [
  {
    name: "Free",
    price: 0,
    duration: "1 Week Pass",
    type: "weekly",
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
    type: "monthly",
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
    type: "annually",
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

async function availTrial() {
  try {
    const response = await fetch(
      `${apiHost}/api/subscription/activate/free-trial/${auth?.currentUser?.uid}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      toast.success("your free trial activated successfully!");
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function Pricing() {
  const [packages, setPackages] = useState([]);

  const [hasTopSubscription, setHasTopSubscription] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    async function getSubscriptionInfo() {
      await fetch(
        `${apiHost}/api/subscription/check-subscription/${auth.currentUser.uid}`
      )
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            if (data.status === "active") {
              if (data.data.subscriptionType === "monthly") {
                setPackages([myPackages[2]]);
              } else if (data.data.subscriptionType === "annually") {
                setHasTopSubscription(true);
              }
            } else {
              if (data.data.freetrialavailed) {
                setPackages(myPackages.slice(1))
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (auth?.currentUser) {
      getSubscriptionInfo();
    } else {
      setPackages(myPackages);
    }
  }, []);

  return (
    <>
      <section className="max-w-7xl px-4 pt-24 pb-12 mx-auto bg-blue-100">
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
          {hasTopSubscription && (
            <p className="px-0 mb-10 text-lg text-gray-500 md:text-xl lg:px-24">
              You have the Top subscription, no need to upgrade!
            </p>
          )}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8">
            {packages.length > 0 ? (
              packages.map((item, i) => {
                return (
                  <div
                    key={item.name}
                    className="border-0 rounded-none shadow-none card sm:rounded-lg md:border bg-white"
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
                        <button onClick={availTrial} className="w-full mt-6">
                          <span>Get started for free &rarr;</span>
                        </button>
                      ) : (
                        <div className="mt-4">
                          <PayPalButton
                            subscriptionType={item.type}
                            cancel_url={`${siteHost}/cancel-subscription`}
                            return_url={`${siteHost}/success-subscription`}
                          />
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
              })
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
