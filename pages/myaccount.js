import React, { useEffect } from 'react'
import { useRouter } from "next/router";

const Myaccount = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [])
  
  return (
    <div className='lg:mt-35 xl:mt-25 mt-42'>
      jhfgkjdhkjhvkjbkjhbkjhb
    </div>
  )
}

export default Myaccount
