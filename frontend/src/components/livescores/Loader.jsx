import React from 'react'

export default function Loader() {
  return (
    <div className="max-w-max flex gap-2 mx-auto">
      <div className="w-5 h-5 rounded-full animate-pulse bg-blue-400"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-blue-400"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-blue-400"></div>
    </div>
  )
}
