"use client"

import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/utils/useClickOutside";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { doSignOut } from "@/firebase/auth";
import { auth } from "@/firebase/firebase";
import ShieldExclaimation from "@/components/commons/ShieldExclaimation";
import ShieldCheck from "./commons/ShieldCheck";
import { useModalContext } from "@/contexts/modalContext";
import { apiHost } from "@/utils";

export default function UserDropdown() {
  const { toggleEmailModal } = useModalContext();
  const [open, setOpen] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const user = auth.currentUser;
  let userName = user.displayName ? user.displayName : user.email.split("@")[0];
  userName =
    userName?.length > 12 ? userName?.substring(0, 12) + "..." : userName;

  let userEmail = user.email;
  userEmail =
    userEmail?.length > 14 ? userEmail?.substring(0, 14) + "..." : userEmail;

  const wrapperRef = useRef(null);
  const router = useRouter();

  const close = () => {
    setOpen(false);
  };
  useClickOutside(wrapperRef, close);

  useEffect(() => {
    async function checkSubscription() {
      await fetch(
        `${apiHost}/api/subscription/check-subscription/${user.uid}`
      )
        .then(async (res) => {
          if (res.ok) {
            // const data = await res.json();
            setHasSubscription(true);
          } else {
            setHasSubscription(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    checkSubscription();
  }, [user.uid]);

  return (
    <>
      <div ref={wrapperRef} className="relative md:ml-4">
        <label
          tabIndex="0"
          className="focus:text-orange-500 normal-case text-orange-500 cursor-pointer h-[80px] flex items-center"
          onClick={() => setOpen(!open)}
        >
          <span className="font-medium">
            {userName.slice(0, 2).toUpperCase()}
          </span>
          <svg
            className="size-3 fill-current opacity-60 inline-block ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </label>

        <div
          tabIndex="0"
          className={` ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          } absolute top-16 -right-10 sm:-right-2 z-[1] rounded-lg overflow-hidden shadow-xl rounded-box w-60 transition ease-in-out duration-300 origin-top`}
        >
          <div className=" bg-[var(--navbar-color)] p-3 drop-shadow-xl shadow-lg divide-y divide-gray-600 ">
            <div className="space-x-2 p-4">
              <div className="flex mr-2 items-center space-x-4">
                <div
                  alt="Name"
                  className="w-10 h-10 text-sm shrink-0 rounded-full bg-violet-600 flex items-center justify-center"
                >
                  {userName.slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-2 flex flex-col flex-1 flex-grow">
                  <div className="relative leading-tight text-gray-900">
                    <span className="flex">
                      <span className="truncate w-auto relative text-white text-base">
                        {userName ?? "Name"}
                      </span>
                    </span>
                  </div>
                  <p
                    title={user.email}
                    className="font-normal text-base text-blue leading-tight truncate text-gray-400"
                  >
                    {userEmail ?? "email@mail.com"}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                {user.emailVerified ? (
                  <div className="bg-green-100 py-1 px-2 w-full rounded-lg text-center text-green-600 font-medium text-xs">
                    {" "}
                    <ShieldCheck className="size-4 inline stroke-2" /> Email
                    Verified
                  </div>
                ) : (
                  <button
                    onClick={toggleEmailModal}
                    className="bg-red-100 py-1 px-2 w-full rounded-lg text-center text-red-600 font-medium text-xs"
                  >
                    {" "}
                    <ShieldExclaimation className="size-4 inline stroke-2" />{" "}
                    Verify Your Email
                  </button>
                )}
              </div>
            </div>
            <div aria-label="navigation" className="py-2">
              <nav className="grid gap-1">
                {hasSubscription && (
                  <Link
                    href="/user/subscription"
                    onClick={close}
                    className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-500 focus:outline-none hover:bg-gray-100 rounded-md"
                  >
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V9C11 10.1046 10.1046 11 9 11H5C3.89543 11 3 10.1046 3 9V5ZM9 5H5V9H9V5Z" />
                      <path d="M3 15C3 13.8954 3.89543 13 5 13H9C10.1046 13 11 13.8954 11 15V19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V15ZM9 15H5V19H9V15Z" />
                      <path d="M13 5C13 3.89543 13.8954 3 15 3H19C20.1046 3 21 3.89543 21 5V9C21 10.1046 20.1046 11 19 11H15C13.8954 11 13 10.1046 13 9V5ZM19 5H15V9H19V5Z" />
                      <path d="M13 15C13 13.8954 13.8954 13 15 13H19C20.1046 13 21 13.8954 21 15V19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V15ZM19 15H15V19H19V15Z" />
                    </svg>
                    <span>Subscription</span>
                  </Link>
                )}
                <Link
                  href="#"
                  onClick={close}
                  className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-500 focus:outline-none hover:bg-gray-100 rounded-md"
                >
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                  </svg>
                  <span>Settings</span>
                </Link>
              </nav>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  doSignOut().then(() => {
                    router.push("/", true);
                  });
                }}
                className="flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-gray-500 focus:outline-none hover:bg-gray-100 rounded-md"
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M9 12h12l-3 -3"></path>
                  <path d="M18 15l3 -3"></path>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
