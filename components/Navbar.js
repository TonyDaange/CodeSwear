import React from "react";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";

const Navbar = () => {
  return (
    <div>
      <header className="text-gray-400 bg-gray-900 ">
        <div className="w-full px-4 ">
          <div className="flex justify-between lg:justify-start xl:justify-between items-center xl:h-25 lg:h-35 h-42 w-full flex-col lg:flex-row ">
            {/* Logo */}
            <Link
              href={"/"}
              className="flex items-center -ml-20 xl:ml-5 lg:mr-15 lg:ml-2 lg:mt-0 mt-5 mb-2 xl:mb-0 xl:mt-0 "
            >
              <img
                src="/hader.png"
                alt="hader"
                className="h-25 xl:h-16 rounded-lg"
              />
            </Link>

            {/* Navigation Menu (centered) */}
            <nav className="justify-center space-x-7 text-2xl lg:text-3xl  lg:space-x-20 xl:space-x-45 xl:mb-0 lg:mt-5 mb-5 font-extrabold xl:mt-0 xl:-ml-50 ">
              <Link href="/tshirts" className="hover:text-white">
                Tshirts
              </Link>
              <Link href="/hoodies" className="hover:text-white">
                Hoodies
              </Link>
              <Link href="/mugs" className="hover:text-white">
                Mugs
              </Link>
              <Link href="/stickers" className="hover:text-white">
                Stickers
              </Link>
            </nav>

            {/* Cart (stays on the right) */}
            <Link href="/order">
              <div className="flex items-center ml-0 flex-none absolute top-10 right-5 lg:top-8 lg:right-10 xl:static xl:right-6 xl:mr-10 ">
                <button className="hover:text-white relative pr-1 ">
                  <TiShoppingCart className="text-7xl xl:text-6xl" />
                  <span className="absolute -top-1 -right-1  bg-pink-600 text-white text-2xl rounded-full h-9 xl:h-7 w-9 xl:w-7 flex items-center justify-center">
                    20
                  </span>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
