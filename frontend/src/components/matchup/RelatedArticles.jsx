"use client"

import React, { useEffect, useState } from "react";
import { apiHost } from "../../utils";
import Markdown from "react-markdown";
import Link from "next/link";
import { dummyPost } from "@/assets/images";

export default function RelatedArticles() {
  const [blogs, setBlogs] = useState([]);

  async function fetchData() {
    await fetch(`${apiHost}/api/blogs`, {
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
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
    <div className="w-full mt-8 px-4 md:px-8 lg:px-12 pb-10">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div className="mb-4">
          <h2 className="font-semibold md:font-bold md:text-lg flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 stroke-2 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>

            <span className="ml-2">Related Articles</span>
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-y-10 gap-x-6 items-start">
          {
            blogs?.slice(0, 4)?.map((blog, i)=> (
              <BlogCard key={i} {...blog} />
            ))
          }
          {/* <li className="relative flex gap-x-4">
            <img
              src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
              alt=""
              className="shadow-md rounded-lg bg-slate-50 w-28"
              width="1216"
              height="640"
            />
            <div className="sm:ml-6 xl:ml-0 overflow-hidden truncate">
              <h3 className="mb-1 text-slate-900 font-semibold truncate">
                <span className="mb-1 block text-sm leading-6 text-indigo-500">
                  Headless UI
                </span>
                Completely unstyled, fully accessible UI components
              </h3>
              <div className="prose prose-slate prose-sm text-slate-600">
                <p>
                  Completely unstyled, fully accessible UI components, designed
                  to integrate beautifully with Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
          <li className="relative flex gap-x-4">
            <img
              src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
              alt=""
              className="shadow-md rounded-lg bg-slate-50 w-28"
              width="1216"
              height="640"
            />
            <div className="sm:ml-6 xl:ml-0 overflow-hidden truncate">
              <h3 className="mb-1 text-slate-900 font-semibold truncate">
                <span className="mb-1 block text-sm leading-6 text-indigo-500">
                  Headless UI
                </span>
                Completely unstyled, fully accessible UI components
              </h3>
              <div className="prose prose-slate prose-sm text-slate-600">
                <p>
                  Completely unstyled, fully accessible UI components, designed
                  to integrate beautifully with Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
          <li className="relative flex gap-x-4">
            <img
              src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
              alt=""
              className="shadow-md rounded-lg bg-slate-50 w-28"
              width="1216"
              height="640"
            />
            <div className="sm:ml-6 xl:ml-0 overflow-hidden truncate">
              <h3 className="mb-1 text-slate-900 font-semibold truncate">
                <span className="mb-1 block text-sm leading-6 text-indigo-500">
                  Headless UI
                </span>
                Completely unstyled, fully accessible UI components
              </h3>
              <div className="prose prose-slate prose-sm text-slate-600">
                <p>
                  Completely unstyled, fully accessible UI components, designed
                  to integrate beautifully with Tailwind CSS.
                </p>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

const BlogCard = ({title, slug, content, image}) => {
  return (
    <li className="">
      <Link href={`/blogs/${slug}`} className="relative flex gap-x-4">
      <img
        src={image ?? dummyPost.src}
        alt="blogImage"
        className="shadow-md rounded-lg bg-slate-50 w-28 h-20 object-cover"
      />
      <div className="sm:ml-6 xl:ml-0 overflow-hidden truncate">
        <h3 className="mb-1 text-slate-900 font-semibold truncate">
          <span className="mb-1 block text-sm leading-6 text-indigo-500">
            Category
          </span>
          {title}
        </h3>
        {/* <div className="prose prose-slate prose-sm text-slate-600">
          <Markdown>
            {content.slice(0,100)}
          </Markdown>
        </div> */}
      </div>
      </Link>
    </li>
  );
};
