"use client"

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import { apiHost } from "@/utils";
import Markdown from "react-markdown";

export default function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState();
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    fetch(`${apiHost}/api/blogs/${slug}`, {
      method: "GET",
    })
      .then(async (res) => {
        const data = await res.json();
        setArticle(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(`${apiHost}/api/blogs`, {
      method: "GET",
    })
      .then(async (res) => {
        const data = await res.json();
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  // useEffect(() => {
  //   if (article?.content) {
  //     console.log(article?.content);
  //   }
  // }, [article]);

  return (
    <>
      <section className="container mx-auto p-5 sm:p-10 md:p-16 relative">
        {article?.image && (
          <div
            className={`bg-cover bg-center text-center overflow-hidden min-h-[500px] rounded-xl `}
            style={{
              backgroundImage: `url(${article?.image})`,
            }}
          />
        )}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="mt-3 bg-white flex flex-col justify-between leading-normal">
            <div className="bg-white rounded-none lg:rounded-xl relative top-0 lg:px-8">
              <h1 className="text-gray-900 font-bold text-3xl mb-5">
                {article?.title}
              </h1>
              {article?.content && <Markdown className="prose prose-headings:p-0 prose-headings:mb-2 prose-img:rounded-lg prose-a:no-underline prose-a:text-blue-500">{article.content}</Markdown>}
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
            {blogs?.slice(0, 4)?.map((item, index) => {
              return <BlogCard key={index} {...item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
