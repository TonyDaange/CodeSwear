import React, { useState } from "react";
import { useRouter } from "next/router";
import Product from "../../models/Product";
import mongoose from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = ({ buyNow, addToCart, product, variant }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const checkServiceability = async () => {
    const pins = await fetch("/api/pincode");

    const pincodes = await pins.json();
    if (pincodes.includes(parseInt(pin))) {
      setService(true);
      // toast.success("We deliver to this pincode!");
      toast.success("We deliver to this pincode!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setService(false);
      toast.error("Sorry! We don't deliver to this pincode yet.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const defaultColor =
    product && product.color
      ? product.color
      : Object.keys(variant || {})[0] || "";
  const defaultSize = (() => {
    if (product && product.size) return product.size;
    if (variant && variant[defaultColor])
      return Object.keys(variant[defaultColor])[0] || "";
    const firstColor = Object.keys(variant || {})[0];
    return variant && variant[firstColor]
      ? Object.keys(variant[firstColor])[0] || ""
      : "";
  })();

  const [color, setColor] = useState(defaultColor);
  const [size, setSize] = useState(defaultSize);
  const [currentProduct, setCurrentProduct] = useState(product);
  const [currentSlug, setCurrentSlug] = useState(
    product && product.slug ? product.slug : "",
  );

  const refreshVariant = async (newColor, newSize) => {
    if (!variant) return;
    const sizesForColor = variant[newColor];
    if (!sizesForColor) return;
    const selectedSize = newSize || Object.keys(sizesForColor)[0];
    const slugEntry =
      sizesForColor[selectedSize] ||
      sizesForColor[Object.keys(sizesForColor)[0]];
    if (!slugEntry || !slugEntry.slug) return;

    // update local UI state
    setColor(newColor);
    setSize(selectedSize);
    setCurrentSlug(slugEntry.slug);

    // fetch product client-side (use existing API that returns all products)
    try {
      const res = await fetch("/api/getproducts");
      if (res.ok) {
        const data = await res.json();
        const products = data.products || [];
        const found = products.find((p) => p.slug === slugEntry.slug);
        if (found) setCurrentProduct(found);
      }
    } catch (e) {
      console.warn("Could not fetch product for slug", slugEntry.slug, e);
    }

    // update URL without full reload
    try {
      router.replace(`/product/${slugEntry.slug}`, undefined, {
        shallow: true,
      });
    } catch (e) {
      console.warn("router.replace failed", e);
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden lg:mt-35 xl:mt-25 mt-65 text-2xl">
      <div className="px-5 py-24 mx-auto">
        <div className="lg:w-9/10 mx-auto flex flex-wrap ">
          <img
            alt="ecommerce"
            className="md:w-1/3 lg:w-auto w-auto xl:h-200 lg:h-160 h-auto object-cover object-top rounded mx-auto lg:px-15 lg:mx-0"
            src={
              currentProduct && currentProduct.img
                ? currentProduct.img
                : "/tshirt.webp"
            }
            // src={product.img}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-[15px] title-font text-gray-500 tracking-widest">
              CODESWEAR
            </h2>
            <h1 className="text-gray-900 text-4xl title-font font-medium mb-1">
              {(currentProduct && currentProduct.name) || product.name}
              {size && size !== "undefined" ? ` (${size}/${color})` : ` (${color})`}
            </h1>
            <div className="flex mb-4 ">
              <span className="flex items-center ">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5 text-blue-500"
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
                  className="w-5 h-5 text-blue-500"
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
                  className="w-5 h-5 text-blue-500"
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
                  className="w-5 h-5 text-blue-500"
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
                  className="w-5 h-5 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3 text-2xl">46 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">
              {(currentProduct && currentProduct.desc) || product.desc}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variant).includes("Blue") &&
                  Object.keys(variant["Blue"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Blue", size)}
                      className={`border-2 border-gray-300 mx-[2px]  bg-blue-500 rounded-full w-7 h-7 focus:outline-black ${color === "Blue" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Black") &&
                  Object.keys(variant["Black"]).includes(size) && (
                    <button
                      onClick={() => {
                        refreshVariant("Black", size);
                      }}
                      className={`border-2 border-gray-300 mx-[2px] bg-black rounded-full w-7 h-7 focus:outline-black ${color === "Black" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Dark Blue") &&
                  Object.keys(variant["Dark Blue"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Dark Blue", size)}
                      className={`border-2 border-gray-300 mx-[2px] rounded-full w-7 h-7 focus:outline-black bg-[#2d415e] ${color === "Dark Blue" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Light Blue") &&
                  Object.keys(variant["Light Blue"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Light Blue", size)}
                      className={`border-2 border-gray-300 mx-[2px] ml-1 bg-blue-400 rounded-full w-7 h-7 focus:outline-black ${color === "Light Blue" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Pink") &&
                  Object.keys(variant["Pink"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Pink", size)}
                      className={`border-2 border-gray-300 mx-[2px] ml-1 bg-[#eb4657] rounded-full w-7 h-7 focus:outline-black ${color === "Pink" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("White") &&
                  Object.keys(variant["White"]).includes(size) && (
                    <button
                      onClick={() => {
                        refreshVariant("White", size);
                      }}
                      className={`border-2 border-gray-300 mx-[2px] rounded-full w-7 h-7  focus:outline-black bg-white ${color === "White" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}

                {Object.keys(variant).includes("Red") &&
                  Object.keys(variant["Red"]).includes(size) && (
                    <button
                      onClick={() => {
                        refreshVariant("Red", size);
                      }}
                      className={`border-2 border-gray-300 mx-[2px] ml-1 bg-red-600 rounded-full w-7 h-7 focus:outline-black ${color === "Red" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Dark Green") &&
                  Object.keys(variant["Dark Green"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Dark Green", size)}
                      className={`border-2 border-gray-300 mx-[2px] rounded-full w-7 h-7 focus:outline-black bg-[#657537] ${color === "Dark Green" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Green") &&
                  Object.keys(variant["Green"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Green", size)}
                      className={`border-2 border-gray-300 mx-[2px] rounded-full w-7 h-7 focus:outline-black bg-[#116741] ${color === "Green" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}

                {Object.keys(variant).includes("Off White") &&
                  Object.keys(variant["Off White"]).includes(size) && (
                    <button
                      onClick={() => {
                        refreshVariant("Off White", size);
                      }}
                      className={`border-2 border-gray-300 mx-[2px] ml-1 bg-[#f3eccc] rounded-full w-7 h-7 focus:outline-black ${color === "Off White" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Yellow") &&
                  Object.keys(variant["Yellow"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Yellow", size)}
                      className={`border-2 border-gray-300 mx-[2px] ml-1 bg-[#fdda64] rounded-full w-7 h-7 focus:outline-black ${color === "Yellow" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Purple") &&
                  Object.keys(variant["Purple"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Purple", size)}
                      className={`border-2 border-gray-300 mx-[2px] bg-[#6f59a2] rounded-full w-7 h-7 focus:outline-black ${color === "Purple" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Dark Teal") &&
                  Object.keys(variant["Dark Teal"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Dark Teal", size)}
                      className={`border-2 border-gray-300 mx-[2px] bg-[#287d90] rounded-full w-7 h-7 focus:outline-black ${color === "Dark Teal" ? "ring-3 ring-black" : ""} `}
                    ></button>
                  )}
                {Object.keys(variant).includes("Random 1") &&
                  Object.keys(variant["Random 1"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Random 1", size)}
                      className={`border-2 border-gray-300 mx-[2px] px-1  rounded-[4px] w-auto h-auto focus:outline-black ${color === "Random 1" ? "ring-3 ring-black" : ""} `}
                    >
                      Random 1
                    </button>
                  )}
                {Object.keys(variant).includes("Paper") &&
                  Object.keys(variant["Paper"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Paper", size)}
                      className={`border-2 border-gray-300 mx-[2px] px-1  rounded-[4px] w-auto h-auto focus:outline-black ${color === "Paper" ? "ring-3 ring-black" : ""} `}
                    >
                      Paper
                    </button>
                  )}
                {Object.keys(variant).includes("Job") &&
                  Object.keys(variant["Job"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Job", size)}
                      className={`border-2 border-gray-300 mx-[2px] px-1  rounded-[4px] w-auto h-auto focus:outline-black ${color === "Job" ? "ring-3 ring-black" : ""} `}
                    >
                      Job
                    </button>
                  )}
                {Object.keys(variant).includes("Super Hero") &&
                  Object.keys(variant["Super Hero"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Super Hero", size)}
                      className={`border-2 border-gray-300 mx-[2px] px-1  rounded-[4px] w-auto h-auto focus:outline-black ${color === "Super Hero" ? "ring-3 ring-black" : ""} `}
                    >
                      Super Hero
                    </button>
                  )}
              
                {Object.keys(variant).includes("Business") &&
                  Object.keys(variant["Business"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Business", size)}
                      className={`border-2 border-gray-300 mx-[2px] px-1  rounded-[4px] w-auto h-auto focus:outline-black ${color === "Business" ? "ring-3 ring-black" : ""} `}
                    >
                      Business
                    </button>
                  )}
                {Object.keys(variant).includes("Tourist Places") &&
                  Object.keys(variant["Tourist Places"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Tourist Places", size)}
                      className={`border-2 border-gray-300 mx-[2px] px-1  rounded-[4px] w-auto h-auto focus:outline-black ${color === "Tourist Places" ? "ring-3 ring-black" : ""} `}
                    >
                      Tourist Places
                    </button>
                  )}
                {Object.keys(variant).includes("Random 2") &&
                  Object.keys(variant["Random 2"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Random 2", size)}
                      className={`border-2 border-gray-300 mx-[2px] px-1  rounded-[4px] w-auto h-auto focus:outline-black ${color === "Random 2" ? "ring-3 ring-black" : ""} `}
                    >
                      Random 2
                    </button>
                  )}
                {Object.keys(variant).includes("Pets") &&
                  Object.keys(variant["Pets"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("Pets", size)}
                      className={`border-2 border-gray-300 mx-[2px] px-1  rounded-[4px] w-auto h-auto focus:outline-black ${color === "Pets" ? "ring-3 ring-black" : ""} `}
                    >
                      Pets
                    </button>
                  )}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    value={size}
                    onChange={(e) => {
                      refreshVariant(color, e.target.value);
                    }}
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-xl pl-3 pr-10 "
                  >
                    {variant &&
                      variant[color] &&
                      Object.keys(variant[color]).includes("XS") && (
                        <option value={"XS"}>XS</option>
                      )}
                    {variant &&
                      variant[color] &&
                      Object.keys(variant[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                    {variant &&
                      variant[color] &&
                      Object.keys(variant[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                    {variant &&
                      variant[color] &&
                      Object.keys(variant[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                    {variant &&
                      variant[color] &&
                      Object.keys(variant[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                    {variant &&
                      variant[color] &&
                      Object.keys(variant[color]).includes("XXL") && (
                        <option value={"XXL"}>XXL</option>
                      )}
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
                ₹{(currentProduct && currentProduct.price) || product.price}.00
              </span>
              <button
                onClick={() => {
                  let proprice = product.price;
                  buyNow(
                    currentSlug || slug,
                    1,
                    (currentProduct && currentProduct.price) || { proprice },
                    (currentProduct && currentProduct.name) || "Product",
                    size,
                    color,
                  );
                }}
                className="flex md:mx-5 mx-2 text-white bg-blue-500 border-0 lg:py-2 py-1 md:px-4 xl:px-6 px-2 focus:outline-none hover:bg-blue-800 rounded"
              >
                Buy Now
              </button>
              <button
                onClick={() => {
                  let proprice = product.price;
                  const finalSize =
                    size && size !== "default" && size !== "undefined"
                      ? size
                      : "";
                  addToCart(
                    currentSlug || slug,
                    1,
                    (currentProduct && currentProduct.price) || { proprice },
                    (currentProduct && currentProduct.name) || "Product",
                    finalSize,
                    color,
                  );
                }}
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
      <ToastContainer
        bodyClassName="font-mono"
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
      />
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variant = await Product.find({
    name: product.name,
    category: product.category,
  });
  let colorSizeSlug = {};
  for (let item of variant) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variant: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default ProductPage;
