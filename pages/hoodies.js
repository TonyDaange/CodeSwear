import Link from "next/link";
import React from "react";
import Product from "../models/Product";
import mongoose from "mongoose";

const Hoodies = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font text-2xl lg:mt-35 xl:mt-25 mt-42">
        <div className="container px-4 py-20 mx-auto">
          <div className="flex flex-wrap justify-center ">
            {Object.keys(products).length === 0 && (
              <p className="text-center text-gray-500 text-2xl">
                Sorry all the hoodies are currently out of stock. New stock coming soon. Stay tuned!
              </p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <div
                  key={products[item]._id}
                  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] hover:shadow-[0_10px_20px_0_rgba(0,0,0,0.2)] transition-shadow duration-800] lg:m-5"
                >
                  <Link
                    passHref={true}
                    href={`/product/${products[item].slug}`}
                    className="block relative h-auto rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="w-auto h-[400px] lg:h-[300px] block m-auto lg:mx-0"
                      src={`${products[item].img}`}
                    />
                    <div className="mt-4 text-center lg:text-left">
                      <h3 className="text-gray-500 text-lg tracking-widest title-font mb-1">
                        {products[item].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-2xl font-medium">
                        {products[item].name}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                      <div className="mt-1 text-gray-500">
                        {products[item].size.includes("XS") && (
                          <span className="border px-1 mx-1 text-center border-gray-400">
                            XS
                          </span>
                        )}
                        {products[item].size.includes("S") && (
                          <span className="border px-1 mx-1 text-center border-gray-400">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="border px-1 mx-1 text-center border-gray-400">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="border px-1 mx-1 text-center border-gray-400">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="border px-1 mx-1 text-center border-gray-400">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("XXL") && (
                          <span className="border px-1 mx-1 text-center border-gray-400">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-gray-500">
                        {products[item].color.includes("Black") && (
                          <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-7 h-7 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Blue") && (
                          <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-7 h-7 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Dark Blue") && (
                          <button className="border-2 border-gray-300 ml-1 bg-[#2d415e] rounded-full w-7 h-7 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Purple") && (
                          <button className="border-2 border-gray-300 ml-1 bg-[#6f59a2] rounded-full w-7 h-7 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Red") && (
                          <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-7 h-7 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Green") && (
                          <button className="border-2 border-gray-300 ml-1 bg-[#116741] rounded-full w-7 h-7 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "hoodie" });
  let hoodies = {};
  for (let item of products) {
    if (item.name in hoodies) {
      if (
        !hoodies[item.name].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        hoodies[item.name].color.push(item.color);
      }
      if (
        !hoodies[item.name].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        hoodies[item.name].size.push(item.size);
      }
    } else {
      hoodies[item.name] = JSON.parse(JSON.stringify(item));
      hoodies[item.name].color = item.availableQty > 0 ? [item.color] : [];
      hoodies[item.name].size = item.availableQty > 0 ? [item.size] : [];
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(hoodies)) },
  };
}

export default Hoodies;
