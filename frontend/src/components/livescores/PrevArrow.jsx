import React from 'react'

export default function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute -left-1 lg:-left-8 top-1/2 -translate-y-1/2 p-1 lg:p-2 hover:bg-blue-50/60 hover:shadow z-10 rounded-full"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="size-5 text-gray-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
}
