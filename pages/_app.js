import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  // routeChangeStart = () => {
  //   setProgress(40);
  // }
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(35);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    // log("Oh.... this is UseEffeect \n by _app.js");
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      error("Error loading cart from localStorage:", error);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
      setKey(Math.random());
    }
    if (!myuser) {
      setUser({ value: null });
      setKey(Math.random());
    }
    // log("key " + key);
  }, [router.query]);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      // log(myCart[keys[i]]);
      // log(keys);
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
    // localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    let newSubTotal = subTotal + qty * price;
    setSubTotal(newSubTotal);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    setSubTotal(0);
    saveCart({});
    console.log("Cart has been cleared.");
  };

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    setCart({});
    saveCart({});

    let newCart = {};
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    let newSubTotal = subTotal + qty * price;
    setSubTotal(newSubTotal);
    saveCart(newCart);

    router.push("/checkout");
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    // let newCart = cart;
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    console.log(itemCode);
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    let newSubTotal = subTotal - qty * price;
    setSubTotal(newSubTotal);
    saveCart(newCart);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoadingBar
        color="#00ffe2"
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        transitionTime={1000}
        loaderSpeed={1000}
      />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        bodyClassName="font-mono"
      />
      {key && (
        <Navbar
          key={key}
          user={user}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
        />
      )}
      <main className="flex-1">
        <Component
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          buyNow={buyNow}
          {...pageProps}
        />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
