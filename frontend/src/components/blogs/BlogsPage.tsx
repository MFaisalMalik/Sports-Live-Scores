"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

import { apiHost } from "@/utils";
import Loader from "@/components/livescores/Loader";;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  async function fetchData() {
    await fetch(`${apiHost}/api/blogs`, {
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="h-[400px] bg-[url('../assets/images/blogs-banner.webp')] bg-center bg-cover bg-no-repeat">
        <div className="w-full h-full bg-black/30 flex items-center">
          <div className="container mx-auto px-10 ">
            <h1 className="font-bold text-left text-white text-3xl sm:text-4xl lg:text-7xl">
              Read Our Latest Blogs
            </h1>
            <p
              role="contentinfo"
              className="px-0 mb-6 text-lg text-gray-100 md:text-xl"
            >
              Stay ahead of the competition with the most up-to-date information
              in the world of sports betting!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blue-100 min-h-screen">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-10 pb-20">
          <div className="-mt-32 grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
            {blogs?.map((item, index) => {
              return <BlogCard key={index} {...item} />;
            })}
          </div>
          {blogs.length < 1 && (
            <div className="flex justify-center w-full">
              <Loader />
            </div>
          )}
          {blogs.length > 8 && (
            <div className="mt-8 flex justify-center">
              <nav className="bg-blue-200 rounded-full px-4 py-2">
                <ul className="flex text-gray-600 gap-4 font-medium py-2">
                  <li>
                    <Link
                      href="#"
                      className="rounded-full px-4 py-2 bg-white text-gray-600"
                    >
                      1
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out"
                    >
                      2
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out"
                    >
                      3
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out"
                    >
                      4
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out"
                    >
                      5
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
