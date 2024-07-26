import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./SignIn_SignUp.css";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningInGoogle, setIsSigningInGoogle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
      console.log(userCredential);
      await saveUser(userCredential);
      navigate(redirect ? redirect : "/");
    } catch (error) {
      setErrorMessage(error.message);
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();

    if (isSigningIn) return;

    setIsSigningIn(true);
    setIsSigningInGoogle(true);
    doSignInWithGoogle()
      .then(async (userCredential) => {
        await saveUser(userCredential);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsSigningIn(false);
        setIsSigningInGoogle(false);
      });
  };

  const saveUser = async (userCredential) => {
    try {
      const uid = userCredential.user.uid;
      let name = userCredential.user.displayName;
      let email = userCredential.user.email;
      const user = { name, email, uid };
      await axios.post(`${process.env.REACT_APP_API_HOST}/api/user`, user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [navigate, userLoggedIn]);

  return (
    <>
      <div className="min-h-screen bg-blue-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-md sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  onSubmit={handleSubmit}
                  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSigningIn}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSigningIn}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>

                  <span className="text-sm">
                    Forgot Password?{" "}
                    <Link className="text-blue-700" to="/reset-password">
                      reset!
                    </Link>
                  </span>

                  {errorMessage && (
                    <span className="block text-sm text-red-500 ">
                      {errorMessage}
                    </span>
                  )}

                  <div className="relative">
                    <button
                      type="submit"
                      disabled={isSigningIn}
                      className="bg-blue-600 text-white rounded-md px-4 py-1"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <span className="text-sm">
              Not a Member?{" "}
              <Link className="text-blue-700" to="/sign-up">
                Register Now!
              </Link>
            </span>

            {/* OR Divider */}
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-px my-8 bg-gray-200 border-0 " />
              <span className="absolute px-3 font-medium text-gray-600 -translate-x-1/2 bg-white left-1/2 ">
                or
              </span>
            </div>

            <div className=" w-full flex justify-center">
              <button
                onClick={onGoogleSignIn}
                className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  {" "}
                  <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    {" "}
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      {" "}
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        {" "}
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="signup-signin-container">
        {userLoggedIn && navigate("/")}

        <div className="header">
          <div className="text ">Sign In</div>
          <div className="underline"></div>
        </div>

        <form className="inputs" onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <img src="/images/email.png" alt="" />
              <input
                value={email}
                autoComplete="email"
                required
                disabled={isSigningIn}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Id"
              />
            </div>

            <div className="input">
              <img src="/images/password.png" alt="" />
              <input
                value={password}
                autoComplete="current-password"
                required
                disabled={isSigningIn}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>

            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}
          </div>

          <div className="submit-container">
            <button type="submit" className="submit" disabled={isSigningIn}>
              Sign In
            </button>
          </div>
        </form>

        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>

        <div className="flex-row-center">
          <div className="divider-line divider-left"></div>
          <div className="or-text">OR</div>
          <div className="divider-line divider-right"></div>
        </div>

        <button
          className="sign-in-with-google"
          disabled={isSigningIn}
          // onClick={(e) => { onGoogleSignIn(e) }}
        >
          <svg
            className="svg-icon"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_17_40)">
              <path
                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                fill="#4285F4"
              />
              <path
                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                fill="#34A853"
              />
              <path
                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                fill="#FBBC04"
              />
              <path
                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {isSigningInGoogle ? 'Signing In...' : 'Continue with Google'}
        </button>
      </div> */}
    </>
  );
}
