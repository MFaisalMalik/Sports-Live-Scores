import React from "react";
import clsx from "clsx"

export default function TickIcon({colorClass}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={clsx("flex-none w-4 h-4 mt-1 mr-2", colorClass ?? 'text-yellow-600')}
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}
