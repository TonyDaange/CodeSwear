import mongoose from "mongoose";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import Order from "../models/Order";

const MyOrder = ({ cart, subTotal, order }) => {
  const products = order.products;
  // const [date, setDate] = useState(order.createdAt);
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(router);
  console.log(order.products);
  // console.log(order);
  // console.log(id);
  // let opt = { weekday: "long", year: 'numric', month: 'long', day: 'numric' }
  const date = new Date(order.createdAt);

  return (
    <div className="lg:mt-35 xl:mt-25 mt-42 text-2xl">
      <section className="text-black body-font overflow-hidden">
        <div className=" lg:px-20 xl:px-60 py-24 mx-auto">
          <div className="lg:full  flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-md title-font text-black tracking-widest text-center lg:text-left">
                CODESWEAR
              </h2>
              <h1 className="text-black text-4xl title-font font-medium mb-4 text-center lg:text-left">
                Order Id: #{order.orderId}
              </h1>

              <p className="leading-relaxed mb-4 px-10 lg:px-0">
                Your order has been successfully placed. Your order will be
                delivered within 2-3 business days.
              </p>
              <p className="leading-relaxed mb-4 px-10 lg:px-0">
                Order Placed On:{" "}
                <b>
                  {date &&
                    date.toLocaleString("mr-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      weekday: "long",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                </b>
              </p>
              <p className="leading-relaxed mb-4 px-10 lg:px-0">
                Your Payment Status is: <b>{order.status}</b>
              </p>
              <div className="flex mb-4 justify-between border-b-2 border-gray-300 px-10 lg:px-0 ">
                <a className="w-6/10 py-2 text-2xl px-1 ">Item Description</a>
                <a className="w-1/5 py-2 text-2xl px-1">Quantity</a>
                <a className="w-1/5 py-2 text-2xl px-1 text-end lg:text-center">
                  Item Total
                </a>
              </div>

              {Object.keys(products).map(
                (key) =>
                  products[key].qty > 0 && (
                    <div
                      key={key}
                      className="flex border-b border-gray-200 py-2  px-10 lg:px-0"
                    >
                      <span className="w-5/6 text-black">
                        {products[key].name}(
                        {products[key].size &&
                        products[key].size !== "undefined"
                          ? `${products[key].size}/${products[key].variant}`
                          : `${products[key].variant}`}
                        )
                      </span>
                      <span className="w-1/5 ml-auto text-black">
                        {products[key].qty}
                      </span>
                      <span className="w-1/5 ml-auto text-black">
                        ₹{products[key].price * products[key].qty}
                      </span>
                    </div>
                  ),
              )}
              {/* <div className="flex border-b border-gray-200 py-2 px-10 lg:px-0">
                <span className="w-3/5 text-black">Hoodie MD (Red)</span>
                <span className="w-1/5 ml-auto text-black">1</span>
                <span className="w-1/5 ml-auto text-black">₹599.00</span>
              </div>
              <div className="flex border-b border-gray-200 py-2 px-10 lg:px-0">
                <span className="w-3/5 text-black">Hoodie L (Nevy Blue)</span>
                <span className="w-1/5 ml-auto text-black">1</span>
                <span className="w-1/5 ml-auto text-black">₹599.00</span>
              </div>
              <div className="flex border-b border-gray-200 py-2 px-10 lg:px-0  ">
                <span className="w-3/5 text-black">Hoodie XL (Green)</span>
                <span className="w-1/5 ml-auto text-black">1</span>
                <span className="w-1/5 ml-auto text-black">₹599.00</span>
              </div> */}

              <div className="flex py-4  px-10 lg:px-0">
                <span className="title-font font-medium text-3xl text-black ">
                  Subtotal: {order.amount}
                </span>
                <button className="flex ml-auto text-white bg-blue-500 border-0 lg:py-2 py-2 lg:px-6 px-3 focus:outline-none hover:bg-blue-600 rounded">
                  Track Order
                </button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-700 ml-4">
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
                </button> */}
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-full h-64 object-cover object-center rounded  px-10 lg:px-0"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}

export default MyOrder;
