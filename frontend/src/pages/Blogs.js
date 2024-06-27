import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import allBlogs from "../utils/allBlogs.json";
import { Link } from "react-router-dom";
import Footer from "../components/Footer2";
import { backendHost } from "../utils";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  async function fetchData() {
    await fetch(`${backendHost}/api/blogs`, {
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
    <>
      <div className="h-[400px] bg-[url('https://images.pexels.com/photos/768474/pexels-photo-768474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center bg-cover bg-no-repeat">
        <div className="w-full h-full bg-black/20 flex items-center">
          <div className="container mx-auto px-10 ">
            <h1 className="font-bold text-left text-white text-3xl sm:text-4xl lg:text-7xl">
              Blogs
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-blue-100 min-h-screen">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-10 pb-20">
          <h1 className="block pb-2 mb-5 text-2xl text-center font-extrabold leading-none tracking-normal text-transparent md:text-4xl md:tracking-tight bg-clip-text bg-gradient-to-r from-blue-800 to-purple-700">
            Read Our Latest
          </h1>
          <p
            role="contentinfo"
            className="px-0 mb-6 text-lg text-center text-gray-700 md:text-xl lg:px-24"
          >
            Whether article spirits new her covered hastily sitting her. Money
            witty books nor son
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
            {blogs?.map((item, index) => {
              return <BlogCard key={index} {...item} />;
            })}
          </div>
          {blogs.length > 8 && (
            <div className="mt-8 flex justify-center">
              <nav className="bg-blue-200 rounded-full px-4 py-2">
                <ul className="flex text-gray-600 gap-4 font-medium py-2">
                  <li>
                    <Link
                      to="#"
                      className="rounded-full px-4 py-2 bg-white text-gray-600"
                    >
                      1
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out"
                    >
                      2
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out"
                    >
                      3
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out"
                    >
                      4
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
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

      <Footer />
    </>
  );
}
