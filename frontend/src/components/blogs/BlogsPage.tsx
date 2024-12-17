"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

import Loader from "@/components/livescores/Loader";
import { apiHost } from "@/utils";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [afterThis, setAfterThis] = useState();
  const [beforeThis, setBeforeThis] = useState();
  const [count, setCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageAction, setPageAction] = useState("NEXT");

  async function fetchData() {
    await fetch(`${apiHost}/api/blogs/default`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: currentPage,
        page_action: pageAction,
        after_this: afterThis,
        before_this: beforeThis,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        setBlogs(data.blogs);
        setAfterThis(data.afterThis);
        setBeforeThis(data.beforeThis);
        setCount(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  function handlePageChange(page: number) {
    if (page > currentPage) {
      setPageAction("NEXT");
    } else {
      setPageAction("PREVIOUS");
    }
    setCurrentPage(page);
  }

  function getPaginationPages(totalCount: number, blogsPerPage = 8) {
    const totalPages = Math.ceil(totalCount / blogsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = getPaginationPages(count);
  const lastPage = pages[pages.length - 1];

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
          {blogs?.length < 1 && (
            <div className="flex justify-center w-full">
              <Loader />
            </div>
          )}
          {count && count > 8 && (
            <div className="mt-8 flex justify-center">
              <nav className="bg-blue-200 rounded-full">
                <div className="flex divide-x divide-gray-200">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="w-full max-w-28 text-sm bg-blue-500 disabled:bg-gray-300 hover:bg-blue-700 disabled:hover:bg-gray-300 text-white disabled:text-gray-600 px-4 py-2 rounded-l-full disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={currentPage < 2}
                  >
                    PREVIOUS
                  </button>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="w-full max-w-28 text-sm bg-blue-500 disabled:bg-gray-300 hover:bg-blue-700 disabled:hover:bg-gray-300 px-4 py-2 rounded-r-full disabled:cursor-not-allowed text-white disabled:text-gray-600"
                  >
                    NEXT
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
