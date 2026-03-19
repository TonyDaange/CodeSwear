import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Myaccount = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    }
  }, []);

  return (
    <div className="lg:mt-35 xl:mt-25 mt-42">
      <h1 className="text-2xl font-bold"> my account</h1>
    </div>
  );
};

export default Myaccount;
