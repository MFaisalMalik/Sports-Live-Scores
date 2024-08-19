import Link from "next/link";
import React from "react";

export default function PaymentError() {
  return (
    <div className="bg-white h-screen">
      <div className="p-6 mt-6 md:mx-auto flex flex-col items-center">
        <span className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-600 sm:mx-0 sm:h-16 sm:w-16">
          <svg
            className="w-10 h-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </span>

        <div className="text-center mt-4">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Unsuccessull!
          </h3>
          <p className="text-gray-600 my-2">
            Sorry, we&#39;re unable to process your perchase.
          </p>
          <div className="py-10 text-center">
            <Link
              href="/pricing"
              className="px-12 bg-blue-800 hover:bg-blue-900 rounded text-white font-semibold py-3"
            >
              Buy again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
