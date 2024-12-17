export const revalidate = 3600 * 24 // revalidate at most every day

import React from "react";
import BlogCard from "@/components/BlogCard";
import { apiHost } from "@/utils";
import Markdown from "react-markdown";
import Loader from "@/components/livescores/Loader";

import type { Metadata, NextPage, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  // searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const article = await fetch(`${apiHost}/api/blogs/${slug}`).then((res) =>
    res.json()
  );

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title,
    openGraph: {
      images: [article?.image, ...previousImages],
    },
  };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blogs = await fetch(`${apiHost}/api/blogs/sport`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const article = await fetch(`${apiHost}/api/blogs/${slug}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return (
    <>
      <section className="container mx-auto p-5 sm:p-10 md:p-16 relative">
        {article ? (
          <>
            {article.image && (
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
                  {article?.content && (
                    <Markdown className="prose prose-headings:p-0 prose-headings:mb-2 prose-img:rounded-lg prose-a:no-underline prose-a:text-blue-500">
                      {article.content}
                    </Markdown>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </section>

      <div className="bg-blue-100">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-10 pb-20">
          <h2 className="block pb-2 mb-5 text-2xl font-extrabold leading-none tracking-normal text-transparent md:text-4xl md:tracking-tight bg-clip-text bg-gradient-to-r from-blue-800 to-purple-700">
            Related Articles
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
            {blogs?.map((item: any, index: any) => {
              return <BlogCard key={index} {...item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
