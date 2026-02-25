import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    let res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    setName("");
    setEmail("");
    setPassword("");
    toast.success("Your account has been created!", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    setTimeout(() => {
      router.push("/");
    }, 3000); 
  };
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="lg:mt-35 xl:mt-25 mt-42">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-2xl">
        <div className="mx-auto w-full max-w-xl">
          <img
            src="/tshirt.png"
            alt="Codsewear"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-4xl font-bold  text-gray-900">
            Sign up to create a account
          </h2>
          <p className="mt-2 text-center">
            Alredy have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="mt-10 mx-auto w-full max-w-lg">
          <form onSubmit={handleSubmit} method="POST">
            <div>
              <div className="mt-2">
                <input
                  // value={name}
                  onChange={handleChange}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-t-lg bg-white px-3 py-1.5 text-2xl text-gray-900 outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-blue-600 "
                />
              </div>
              <div className="mt-0">
                <input
                  // value={email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="block w-full  bg-white px-3 py-1.5 text-2xl text-gray-900 outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-blue-600 "
                />
              </div>
              <div className="mt-0">
                <input
                  // value={password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-b-lg bg-white px-3 py-1.5 text-2xl text-gray-900 outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-blue-600 outline-b"
                />
              </div>
            </div>
            {/* <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-6 w-6 rounded-4xl  border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-2xl text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-2xl text-right">
                <Link
                  href="/forgot"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group flex w-full justify-center rounded-lg bg-blue-700 px-3 py-1.5 text-2xl font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-10"
              >
                <span className="absolute flex items-center pl-3">
                  <svg
                    className="h-7 w-7 text-blue-600 group-hover:text-blue-700 mr-105 lg:mr-115"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign up
              </button>
            </div>
            <ToastContainer
              bodyClassName="font-mono"
              newestOnTop
              rtl={false}
              pauseOnFocusLoss
              limit={1}
            />
          </form>

          {/* <p className="mt-3 text-center text-xl text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
