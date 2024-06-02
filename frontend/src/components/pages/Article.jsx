import React from "react";
import { Link, useParams } from "react-router-dom";
import allBlogs from "../../utils/allBlogs.json";
import slugify from "slugify";
import BlogCard from "../BlogCard";
import Footer from "../Footer";

export default function Article() {
  const { blogSlug } = useParams();

  const article = allBlogs.find(
    (itme) => slugify(itme.title) === blogSlug
  );
  return (
    <>
      <section className="container mx-auto p-5 sm:p-10 md:p-16 relative">
        <div
          className={`bg-cover bg-center text-center overflow-hidden min-h-[500px] rounded-xl `}
          style={{
            backgroundImage: `url(${article?.img})`,
          }}
        />
        <div className="max-w-3xl mx-auto">
          <div className="mt-3 bg-white flex flex-col justify-between leading-normal">
            <div className="bg-white rounded-none md:rounded-xl relative top-0 -mt-32 p-8 pt-10">
              <h1 className="text-gray-900 font-bold text-3xl mb-2">
                {article?.title}
              </h1>
              <p className="text-gray-700 text-xs mt-4">
                Written By:
                <Link
                  to="#"
                  className="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                  Ahmad Sultani
                </Link>{" "}
                In
                <Link
                  to="#"
                  className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                  Election
                </Link>
                ,
                <Link
                  to="#"
                  className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                  Politics
                </Link>
              </p>
              <p className="text-base leading-8 my-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <h3 className="text-2xl font-bold my-5">
                #1. What is Lorem Ipsum?
              </h3>
              <p className="text-base leading-8 my-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <blockquote className="border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </blockquote>
              <p className="text-base leading-8 my-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <Link
                to="#"
                className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
              >
                #Election
              </Link>
              ,
              <Link
                to="#"
                className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
              >
                #people
              </Link>
              ,
              <Link
                to="#"
                className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
              >
                #Election2020
              </Link>
              ,
              <Link
                to="#"
                className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
              >
                #trump
              </Link>
              ,
              <Link
                to="#"
                className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
              >
                #Joe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-blue-100">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-10 pb-20">
          <h2 className="block pb-2 mb-5 text-2xl font-extrabold leading-none tracking-normal text-transparent md:text-4xl md:tracking-tight bg-clip-text bg-gradient-to-r from-blue-800 to-purple-700">
            Related Articles
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
            {allBlogs.slice(0, 4)?.map((item, index) => {
              return <BlogCard key={index} {...item} />;
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
