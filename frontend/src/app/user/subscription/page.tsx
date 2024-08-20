"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import formatDate from "@/utils/formatData";
import { useModalContext } from "@/contexts/modalContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "@/components/livescores/Loader";
import { auth } from "@/firebase/firebase";

export default function Subscription() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toggleCancelSubModal, subscriptionData } = useModalContext();

  useEffect(() => {
    setLoading(true);
    if (subscriptionData) {
      setData(subscriptionData);
      setLoading(false);
    } else {
      router.push("/");
      setLoading(false);
      toast.info("No subscriptions found!");
    }
  }, [router, subscriptionData]);

  async function cancleSubscription() {
    toggleCancelSubModal();
  }
  if (loading) {
    return (
      <div className="my-10">
        <Loader />
      </div>
    );
  }
  return (
    <main className="bg-blue-100 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
        {data && (
          <div className="p-4">
            <h1 className="text-2xl text-center leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
              My Subscription
            </h1>
            <div className="max-w-lg mx-auto rounded-lg overflow-hidden lg:max-w-none lg:flex my-10 shadow-blue border-4 border-blue-400">
              <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                <p className="text-xl leading-6 font-medium text-gray-900 lg:max-w-xs lg:mx-auto mb-0 lg:mb-6">
                  A single payment for your entire team
                </p>
                <div>
                  Hi, {auth.currentUser?.displayName || auth.currentUser?.email}
                </div>
                <div className="my-10 lg:my-6 flex items-baseline justify-center text-5xl leading-none font-extrabold text-gray-900">
                  <span className="font-brown">${data.amount || "00"}</span>
                  <span className="text-xl leading-7 font-medium text-gray-500 font-ttnorms">
                    {data?.subscriptionType === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
                {data?.subscriptionStartDate && (
                  <div className="text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Started on : </span>
                      {formatDate(data?.subscriptionStartDate.seconds * 1000)}
                    </p>
                    <p>
                      <span className="font-medium">End Date: </span>{" "}
                      {formatDate(data?.subscriptionEndDate.seconds * 1000)}
                    </p>
                  </div>
                )}
                <div className="mt-6">
                  <div className="rounded-md shadow">
                    <Link
                      href="/pricing"
                      className="flex items-center justify-center px-5 py-3 leading-6 font-medium rounded-md focus:outline-none focus:ring transition duration-200 ease-in-out shadow-blue border-2 border-blue-400 bg-white hover:bg-blue-400 hover:shadow-blue-hover text-blue-400 hover:text-white text-lg relative z-20"
                    >
                      Upgrade
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-white px-6 py-8 lg:flex-shrink-1 lg:p-12">
                <p className="mt-6 text-left font-ttnorms leading-8 text-gray-500 text-lg">
                  The Team subscription grants your entire As a subscriber to
                  our website, you&#39;ll have access to a wide range of
                  exclusive benefits and perks.
                </p>
                <div className="mt-8">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase text-blue-600">
                      What&#39;s included
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200"></div>
                  </div>
                  <ul className="pl-0 mt-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 space-y-5 lg:space-y-0">
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-lg leading-5 text-gray-700 font-ttnorms text-left">
                        Access to premium content and exclusive articles
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-lg leading-5 text-gray-700 font-ttnorms text-left">
                        Free Shipping on select products
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-lg leading-5 text-gray-700 font-ttnorms text-left">
                        Early access to upcoming events and promotions
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-lg leading-5 text-gray-700 font-ttnorms text-left">
                        Dedicated customer support
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase text-red-600">
                      Actions
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200"></div>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={cancleSubscription}
                      className="flex items-center justify-center px-4 py-2 leading-6 font-medium rounded-md focus:outline-none focus:ring ring-red-200 transition duration-200 ease-in-out shadow-red border-2 border-red-500 bg-white hover:bg-red-500 hover:shadow-red-hover text-red-500 hover:text-white text-lg relative z-20"
                    >
                      Cancel subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
