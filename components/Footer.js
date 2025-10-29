import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-400 bg-gray-900 body-font text-xl">
        <div className=" lg:px-0 px-5 xl:px-5 py-5 md:py-24 lg:mx:0 xl:mx-auto mx-auto flex md:items-center  md:flex-row md:flex-nowrap flex-wrap flex-col lg:">
          <div className="lg:ml-10 xl:ml-25 w-100 flex-shrink-0 md:mx-0 mx-auto lg:mx:556 xl:mx-auto text-center md:text-left lg:mr-0">
            <Link
              href={"/"}
              className="flex title-font font-medium items-center md:justify-start justify-center  text-white"
            >
              <img
                src="/hader.png"
                alt="footerhed"
                className=" rounded-lg md:h-auto h-20"
              />
              {/* <Image
                  src="/hader.png"
                  alt="footerhed"
                  width={1}
                  height={1}
                  className="rounded-lg"
                /> */}
              {/* <span className="ml-3 text-xl">Tailblocks</span> */}
            </Link>
            <p className="mt-2 text-xl text-gray-500 px-2">
              Air plant banjo lyft occupy retro adaptogen indego
            </p>
          </div>
          <div className="flex-grow flex flex-wrap xl:pl-20 md:pl-20 lg:pl-10 -mb-10 md:mt-0 mt-10 xl:text-left text-center ">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-2xl mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-white">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-2xl mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-white">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-2xl mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-white">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-2xl mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-white">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white">Fourth Link</a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-75">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-400 text-xl text-center sm:text-left">
              © 2025 CodeSwear
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-gray-400">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-400">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-400">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
