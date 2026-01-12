import Link from "next/link";
import React from "react";

const Forgot = () => {
  return (
    <div className="lg:mt-35 xl:mt-25 mt-42">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-2xl">
        <div className="mx-auto w-full max-w-lg">
          <img
            src="/tshirt.png"
            alt="Codsewear"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-4xl font-bold  text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center">
            Or{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="mt-10 mx-auto w-full max-w-lg">
          <form action="#" method="POST">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-lg bg-white px-3 py-1.5 text-2xl text-gray-900 outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-blue-600 "
                />
              </div>
              
            </div>
            {/* <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-6 w-6 rounded-4xl  border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-2xl text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-2xl text-right">
                <Link
                  href="/forgot"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group flex w-full justify-center rounded-lg bg-blue-700 px-3 py-1.5 text-2xl font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-10"
              >
                <span className="absolute flex items-center pl-3">
                  <svg
                    className="h-7 w-7 text-blue-600 group-hover:text-blue-700 mr-105 lg:mr-115"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
