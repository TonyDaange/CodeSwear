import React, { useRef, useState } from "react";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi2";
import { BsTrash3Fill } from "react-icons/bs";
import { MdAccountBox } from "react-icons/md";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  // Cart items with quantities  ────┬──────························─────┬──────
  //                                 ╰── This is commented out for now ──╯

  const ToggleCart = () => {
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("translate-x-full");
    setIsOpen((prev) => !prev);
  };

  // const increaseQuantity = (itemName) => {
  //   setCart((prevCart) => ({
  //     ...prevCart,
  //     [itemName]: prevCart[itemName] + 1,
  //   }));
  // };

  // const decreaseQuantity = (itemName) => {
  //   setCart((prevCart) => ({
  //     ...prevCart,
  //     [itemName]: Math.max(1, prevCart[itemName] - 1),
  //   }));
  // };

  // Calculate total items
  // const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div>
      <header className="text-white bg-black fixed w-full z-10 body-font border-b border-gray-600 top-0">
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
              <Link href="/tshirts" className="hover:text-blue-800">
                Tshirts
              </Link>
              <Link href="/hoodies" className="hover:text-blue-800">
                Hoodies
              </Link>
              <Link href="/mugs" className="hover:text-blue-800">
                Mugs
              </Link>
              <Link href="/stickers" className="hover:text-blue-800">
                Stickers
              </Link>
            </nav>

            {/* Cart (stays on the right) */}
            <div className="flex items-center ml-0 flex-none absolute top-10 right-5 lg:top-8 lg:right-10 xl:static xl:right-6 xl:mr-10 ">
              <button className=" relative pr-1 flex ">
                <Link href="/login">
                  <MdAccountBox className="hover:text-blue-800 text-5xl lg:text-7xl xl:text-6xl cursor-pointer mx-1" />
                </Link>
                <TiShoppingCart
                  onClick={ToggleCart}
                  className="hover:text-blue-800 text-5xl lg:text-7xl xl:text-6xl cursor-pointer"
                />
                {/* <span className="absolute -top-1 -right-1  bg-blue-600 text-white text-2xl rounded-full h-9 xl:h-7 w-9 xl:w-7 flex items-center justify-center">
                  {totalItems} 
                </span> */}
                {/* small triangle under the cart (points down) */}
                {/* <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-0 h-0 border-l-15 border-r-15 border-b-15 border-l-transparent border-r-transparent border-b-gray-900 pointer-events-none"></div> */}
              </button>
            </div>

            {/* sidebar ↓ */}

            <div
              ref={ref}
              className="sidebar fixed top-42 lg:top-35 xl:top-25 right-0 bg-gray-900 transform translate-x-full transition-transform duration-300 ease-in-out md:w-110 w-78 z-50 flex flex-col px-5 scrollbar-hide rounded-l-2xl "
              style={{ height: "calc(100vh - 10.5rem)" }}
            >
              <h2 className="text-3xl font-bold px-5 pt-5 pb-2 bg-gray-900 flex-shrink-0">
                Your Cart
              </h2>

              <ol className="font-semibold text-xl flex-1 overflow-y-auto overflow-x-hidden">
                {(!cart || Object.keys(cart).length === 0) && (
                  <div className="my-4 mx-6">Your cart is empty!</div>
                )}
                {Object.keys(cart).map((k) => {
                  return (
                    <li key={k} className="flex items-center my-2">
                      <span className="w-5/6 break-words overflow-hidden">
                        {cart[k].name} {cart[k].size} ({cart[k].variant})
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
                        className="text-4xl ml-4 cursor-pointer hover:text-red-400 flex-shrink-0"
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
                {/* {subTotal > 0 && ( */}
                <div className="my-4 mx-6 text-2xl">
                  <strong>Subtotal: </strong> ₹{subTotal}
                </div>
                {/*  )} */}
              </ol>

              <div className="bg-gray-900 py-4 px-5 border-t border-gray-700 flex-shrink-0 flex lg:justify-between lg:space-x-5 lg:flex-row flex-col space-y-3">
                <Link href="/checkout">
                  <button className="w-full text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-500 rounded text-xl font-semibold flex justify-center items-center ">
                    <HiShoppingBag className="text-4xl lg:text-5xl mr-5 lg:mr-3" />
                    Check Out
                  </button>
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-white bg-blue-600 border-0 py-2 lg:py-0 px-8 focus:outline-none hover:bg-blue-500 rounded text-xl font-semibold flex justify-center items-center lg:h-18"
                >
                  <BsTrash3Fill className="text-3xl lg:text-5xl mr-3 lg:mr-3" />
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
