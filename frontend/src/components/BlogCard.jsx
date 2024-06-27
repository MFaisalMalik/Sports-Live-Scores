import React from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";

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
    <div
      className="relative rounded-xl overflow-hidden border flex items-end justify-start w-full text-left bg-center bg-cover h-96"
      style={{
        backgroundImage: `url(${image || '/images/no-image-available-icon-vector.jpg'})`,
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
        <Link
          rel="noopener noreferrer"
          to={`/blogs/${slug}`}
          className="font-medium text-white text-md hover:underline"
        >
          {" "}
          {title}
        </Link>
      </h2>
    </div>
  );
}
