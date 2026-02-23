import React from "react";
import Link from "next/link";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi2";

const checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  return (
    <div className="container lg:mt-35 xl:mt-25 mt-42 mx-auto">
      <h1 className="text-5xl text-center my-50 mb-25 to-black font-extrabold">
        Checkout
      </h1>
      <h2 className="text-4xl mb-10 text-center lg:text-left font-extrabold">
        1. Delivery Details
      </h2>
      <form className=" lg:flex ml-10 mr-10 lg:mr-0 lg:ml-0 justify-center ">
        <div className="px-2 lg:w-1/2">
          <div className=" mb-4 ">
            <label htmlFor="name" className="leading-10 text-2xl to-black ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 "
            />
          </div>
        </div>
        <div className="px-2 lg:w-1/2">
          <div className=" mb-4 ">
            <label htmlFor="email" className="leading-10 text-2xl to-black ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 mb-5"
            />
          </div>
        </div>
      </form>

      <div className="px-2 w-full">
        <div className="mb-4 ml-10 mr-10 lg:mr-0 lg:ml-0">
          <label htmlFor="address" className="leading-10 text-2xl to-black ">
            Address
          </label>
          <textarea
            rows={5}
            id="address"
            name="address"
            className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-300 ease-in-out rounded-[5px] mt-3  mb-3"
          ></textarea>
        </div>
      </div>

      <form className=" lg:flex ml-10 mr-10 lg:mr-0 lg:ml-0 justify-center ">
        <div className="px-2 lg:w-1/2">
          <div className=" mb-4 ">
            <label htmlFor="phone" className="leading-10 text-2xl to-black ">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 "
            />
          </div>
        </div>
        <div className="px-2 lg:w-1/2">
          <div className=" mb-4 ">
            <label htmlFor="city" className="leading-10 text-2xl to-black ">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 mb-5"
            />
          </div>
        </div>
      </form>
      <form className=" lg:flex ml-10 mr-10 lg:mr-0 lg:ml-0 justify-center ">
        <div className="px-2 lg:w-1/2">
          <div className=" mb-4 ">
            <label htmlFor="state" className="leading-10 text-2xl to-black ">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 "
            />
          </div>
        </div>
        <div className="px-2 lg:w-1/2">
          <div className=" mb-4 ">
            <label htmlFor="pincode" className="leading-10 text-2xl to-black ">
              Pin Code
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 mb-5"
            />
          </div>
        </div>
      </form>
      <h2 className="text-4xl mt-25 mb-10 text-center lg:text-left font-extrabold">
        2. Review cart items & Pay
      </h2>
      <div className="sidebar flex flex-col ml-10 mr-10 lg:mr-0 lg:ml-0">
        {/* <h2 className="text-3xl font-bold px-5 pt-5 pb-2  flex-shrink-0">
          Your Cart
        </h2> */}

        <ol className="font-semibold text-2xl flex-1 overflow-y-auto overflow-x-hidden">
          {(!cart || Object.keys(cart).length === 0) && (
            <div className="my-4 mx-6">Your cart is empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k} className="flex items-center my-2">
                <span className="w-5/6 break-words overflow-hidden">
                  {cart[k].name} ({cart[k].size}/{cart[k].variant})
                </span>
                {/* <span className="w-3/5 break-words overflow-hidden">
                         Green Hoodie - SM Green
                      </span> */}

                <AiFillMinusSquare
                  onClick={() => {
                    removeFromCart(
                      k,
                      1,
                      cart[k].price,
                      cart[k].name,
                      cart[k].size,
                      cart[k].variant
                    );
                  }}
                  className="text-4xl  ml-4 cursor-pointer hover:text-red-400 flex-shrink-0"
                />
                <span className="w-1/24 text-center">{cart[k].qty}</span>
                <AiFillPlusSquare
                  onClick={() => {
                    addToCart(
                      k,
                      1,
                      cart[k].price,
                      cart[k].name,
                      cart[k].size,
                      cart[k].variant
                    );
                  }}
                  className="text-4xl cursor-pointer hover:text-green-400 flex-shrink-0"
                />
              </li>
            );
          })}
        </ol>
        <div className="my-4 text-3xl border-t border-gray-700">
          <div className="mt-3">
            <strong>Subtotal: </strong> ₹{subTotal}
          </div>
        </div>

        <div className=" py-4 px-5 flex-shrink-0 flex lg:justify-between lg:space-x-5 lg:flex-row flex-col space-y-3 ">
          <button className="w-full text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-500 rounded text-3xl font-semibold flex justify-center items-center ">
          <Link href="/order" className="flex justify-center items-center">
            <HiShoppingBag className="text-4xl lg:text-5xl mr-5 lg:mr-3" />
            Pay ₹{subTotal}
          </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default checkout;
