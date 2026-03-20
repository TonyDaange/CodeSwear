import React, { useEffect, useEffectEvent, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi2";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const checkout = ({
  cart,
  addToCart,
  removeFromCart,
  subTotal,
  clearCart,
  // user,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [user, setUser] = useState({ value: null });
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"));
    if (user && user.token) {
      setUser(user);
      setEmail(user.email);
    }
  }, []);

  useEffect(() => {
    if (
      name.length >= 5 &&
      email.length >= 5 &&
      phone.length == 10 &&
      address.length >= 10 &&
      pincode.length == 6
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, phone, address, pincode]);

  async function initiatePayment(e) {
    e.preventDefault();
    if (!window.Razorpay) {
      console.error("Razorpay SDK failed to load");
      clearCart();
      toast.error(order.error, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const phone = document.getElementById("phone")?.value || "";

    const oid = Math.floor(Math.random() * Date.now());
    const data = {
      cart,
      subTotal,
      oid,
      email: email,
      name: name,
      phone: phone,
      address: address,
      pincode: pincode,
      city: city,
      state: state,
    };

    const orderReq = await fetch("/api/pretransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const order = await orderReq.json();
    if (!orderReq.ok || !order?.success) {
      console.error("Failed to create order", order);
      const cartClearErrors = new Set([
        "Some items in your cart went out of stock! Please try again later.",
        "The price of some items in your cart have changed. Please try again",
      ]);
      if (
        cartClearErrors.has(order?.error) ||
        (order?.cart && Object.keys(order.cart).length === 0)
      ) {
        clearCart();
      }
      const msg =
        order?.error ||
        order?.message ||
        "Could not start payment. Please try again.";
      toast.error(msg, {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Codeswear",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await fetch("/api/posttransaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            oid,
            cart,
            subTotal,
            ...response,
          }),
        });

        const verification = await verifyRes.json();
        if (verifyRes.ok && verification.success) {
          clearCart();
          alert("Payment successful! Your order has been placed.");
          setTimeout(() => {
            const mongoOrderId =
              verification.orderId || order.orderId || order.id;
            if (mongoOrderId) {
              router.push("/order?id=" + mongoOrderId);
            } else {
              console.error("Missing MongoDB order id in response", {
                verification,
                order,
              });
            }
          }, 10000);
        } else {
          console.error("Payment verification failed", verification);
        }
      },
      prefill: {
        name,
        email,
        contact: phone,
      },
      notes: {
        orderRef: String(oid),
      },
      theme: {
        color: "#0050ff",
      },
      modal: {
        ondismiss: function () {
          console.log("Razorpay checkout closed by user");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const handleChange = async (e) => {
    console.log(user, email);

    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "pincode") {
      setPincode(e.target.value);
      // if (e.target.value.length == 6) {
      if (e.target.value.length == 6) {
        let pins = await fetch("/api/pincode");
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(e.target.value)) {
          setCity(pinJson[e.target.value][0]);
          setState(pinJson[e.target.value][1]);
        } else {
          setState("");
          setCity("");
        }
      } else {
        setState("");
        setCity("");
      }
    } else {
      console.warn("Unhandled input change for", e.target.name);
    }
    setTimeout(() => {
      if (
        name.length >= 5 &&
        email.length >= 5 &&
        phone.length == 10 &&
        address.length >= 10 &&
        pincode.length == 6
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, 100);
  };

  return (
    <div className="container lg:mt-35 xl:mt-25 mt-42 mx-auto">
      <Head>
        <title>Codeswear - Checkout</title>
        <meta name="description" content="Codeswear - Checkout" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        crossOrigin="anonymous"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
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
              onChange={handleChange}
              value={name}
              required
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
            {user && user.token ? (
              <input
                // onChange={handleChange}
                value={user.email}
                required
                type="email"
                id="email"
                name="email"
                className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 mb-5"
                readOnly
              />
            ) : (
              <input
                onChange={handleChange}
                value={email}
                required
                type="email"
                id="email"
                name="email"
                className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 mb-5"
              />
            )}
          </div>
        </div>
      </form>

      <form className=" lg:flex ml-10 mr-10 lg:mr-0 lg:ml-0 justify-center ">
        <div className="px-2 lg:w-1/2">
          <div className=" mb-4 ">
            <label htmlFor="phone" className="leading-10 text-2xl to-black ">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={handleChange}
              required
              placeholder="Your 10 Digit Phone Number"
              type="number"
              id="phone"
              name="phone"
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
              value={pincode}
              onChange={handleChange}
              required
              type="number"
              id="pincode"
              name="pincode"
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
              value={state}
              onChange={handleChange}
              required
              type="text"
              id="state"
              name="state"
              className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 "
              readOnly
            />
          </div>
        </div>
        <div className="px-2 lg:w-1/2">
          <div className=" mb-4 ">
            <label htmlFor="city" className="leading-10 text-2xl to-black ">
              City
            </label>
            <input
              value={city}
              onChange={handleChange}
              required
              type="text"
              id="city"
              name="city"
              className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-10 transition-colors duration-300 ease-in-out rounded-[5px] mt-3 "
              readOnly
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
            onChange={handleChange}
            value={address}
            required
            rows={5}
            id="address"
            name="address"
            className="w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-[18px] outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-300 ease-in-out rounded-[5px] mt-3  mb-3"
          ></textarea>
        </div>
      </div>

      <h2 className="text-4xl mt-25 mb-10 text-center lg:text-left font-extrabold">
        2. Review cart items & Pay
      </h2>
      <div className="sidebar flex flex-col ml-10 mr-10 lg:mr-0 lg:ml-0">
        <ol className="font-semibold text-2xl flex-1 overflow-y-auto overflow-x-hidden">
          {(!cart || Object.keys(cart).length === 0) && (
            <div className="my-4 mx-6">Your cart is empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            const itemDetails = [cart[k].size, cart[k].variant]
              .filter((v) => v && v !== "undefined" && v !== "default")
              .join(" / ");

            return (
              <li key={k} className="flex items-center my-2">
                <span className="w-5/6 break-words overflow-hidden">
                  {cart[k].name} {itemDetails ? `(${itemDetails})` : ""}
                </span>

                <AiFillMinusSquare
                  onClick={() => {
                    removeFromCart(
                      k,
                      1,
                      cart[k].price,
                      cart[k].name,
                      cart[k].size,
                      cart[k].variant,
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
                      cart[k].variant,
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
          <button
            disabled={disabled}
            onClick={async (e) => {
              await initiatePayment(e);
            }}
            className="disabled:bg-blue-400 w-full text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-500 rounded text-3xl font-semibold flex justify-center items-center "
          >
            <HiShoppingBag className="text-4xl lg:text-5xl mr-5 lg:mr-3" />
            Pay ₹{subTotal}
          </button>
        </div>
      </div>
    </div>
  );
};

export default checkout;
