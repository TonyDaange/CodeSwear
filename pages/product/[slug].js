import React, { useState } from "react";
import { useRouter } from "next/router";

const ProductPage = ({ addToCart }) => {
  const router = useRouter();
  const { slug } = router.query;

  {
    /* <h1>Product ID: {slug}</h1> */
  }
  // useState
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const checkServiceability = async () => {
    // const pin = document.querySelector("input").value;
    // setService = false;
    const pins = await fetch("http://localhost:4200/api/pincode");
    // const pincodes = await res.json();
    // for (let i = 0; i < pincodes.length; i++) {
    //   if (pincodes[i] == parseInt(pin)) {
    //     setService = true;
    //     break;
    //   }
    // }
    // if (service) {
    //   alert("Yay! We deliver to this pincode.");
    // } else {
    //   alert("Sorry! We do not deliver to this pincode yet.");
    // }
    const pincodes = await pins.json();
    // console.log(pincodes, pin);
    if (pincodes.includes(parseInt(pin))) {
      setService(true);
      // alert("Yay! We deliver to this pincode.");
    } else {
      setService(false);
      // alert("Sorry! We do not deliver to this pincode yet.");
    }
    // console.log(service);
  };
  const onChangePin = (e) => {
    // console.log(e.target.value);
    setPin(e.target.value);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden lg:mt-35 xl:mt-25 mt-65 text-2xl">
      <div className="px-5 py-24 mx-auto">
        <div className="lg:w-9/10 mx-auto flex flex-wrap ">
          <img
            alt="ecommerce"
            className="md:w-1/3 lg:w-auto w-auto xl:h-200 lg:h-160 h-auto object-cover object-top rounded mx-auto lg:px-15 lg:mx-0"
            src="https://m.media-amazon.com/images/I/61PoKnqNbHL._SY741_.jpg"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-[15px] title-font text-gray-500 tracking-widest">
              CODESWEAR
            </h2>
            <h1 className="text-gray-900 text-4xl title-font font-medium mb-1">
              Green Hoodie
            </h1>
            <div className="flex mb-4 text-2xl">
              <span className="flex items-center ">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3 text-2xl">46 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-xl pl-3 pr-10 ">
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-3xl text-gray-900">
                ₹599.00
              </span>
              <button className="flex md:mx-5 mx-2 text-white bg-blue-500 border-0 lg:py-2 py-1 md:px-4 xl:px-6 px-2 focus:outline-none hover:bg-blue-800 rounded">
                Buy Now
              </button>
              <button
                onClick={()=> {addToCart(slug, 1, 599, "Green Hoodie", "XL", "Green")}}
                className="flex  text-white bg-blue-500 border-0 lg:py-2 py-1 md:px-4 xl:px-6 px-2 focus:outline-none hover:bg-blue-800 rounded"
              >
                Add to Cart
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-auto hover:text-red-600 hover:bg-gray-300">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="pin mt-6 flex space-x-2">
              <input
                onChange={onChangePin}
                type="number"
                className="outline-2 outline-black text-black pl-2 h-[34px] rounded"
                placeholder="Enter your PIN Code "
              />
              <button
                onClick={checkServiceability}
                className="ml-2 bg-blue-500 text-white px-4 py-1 rounded h-[34px] hover:bg-blue-800 outline-2 outline-blue-500 hover:outline-blue-800"
              >
                Check
              </button>
            </div>
            {service && service != null && (
              <div
                id="serviceability-message"
                className="text-green-500 text-lg mt-5"
              >
                Yay! We deliver to this pincode.
              </div>
            )}
            {!service && service != null && (
              <div
                id="serviceability-message"
                className="text-red-500 text-lg mt-5"
              >
                Sorry! We don't deliver to this pincode yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
