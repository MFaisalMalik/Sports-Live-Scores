import React from "react";
import Link from "next/link";
import { placeholderBlue } from "@/assets/images";

export default function BlogCard({ image, title, slug, date }) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = String(new Date(date).getDate()).padStart(2, "0");
  const month = monthNames[new Date(date).getMonth()];

  return (
    <Link
      href={`/blogs/${slug}`}
      rel="noopener noreferrer"
      className="relative rounded-xl cursor-pointer overflow-hidden flex items-end bg-blue-200 justify-start w-full text-left bg-center bg-cover h-96 ring-2 ring-blue-400/40"
      style={{
        backgroundImage: `url(${image ?? placeholderBlue.src})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 "></div>
      <div className="absolute inset-0 flex items-center justify-between mx-5 mt-3">
        <div className="self-start flex flex-col justify-start text-center">
          <span className="text-3xl text-gray-100/90 font-semibold leading-none tracking-wide">
            {day}
          </span>
          <span className="leading-none uppercase text-gray-100/90">
            {month}
          </span>
        </div>
      </div>
      <h2 className="z-10 p-5">
        <div
          title={title}
          className="font-semibold text-white text-md hover:underline"
        >
          {" "}
          {title?.length < 55 ? title : `${title?.slice(0, 55)}...`}
        </div>
      </h2>
    </Link>
  );
}
