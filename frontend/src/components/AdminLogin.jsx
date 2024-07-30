import React from "react";

export default function AdminLogin({onLogin}) {
  return (
    <div className="w-screen min-h-[calc(100vh-5rem)] flex items-center justify-center bg-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <form onSubmit={onLogin} className="min-h-96 min-w-80 px-8 py-6 mt-4 text-left bg-white  rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
                <img
                  src="/images/logo.png"
                  className="w-8"
                />
              <p className="m-0 text-[16px] font-semibold">
                Login to as Admin
              </p>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400 ">
                Username
              </label>
              <input
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
                placeholder="Username"
                name="username"
                required
                type="text"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400 ">Password</label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
              placeholder="••••••••"
              name="password"
              required
            />
          </div>
          <div className="mt-5">
            <button type="sumbit" className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
