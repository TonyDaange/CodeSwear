import React from "react";
import { useRouter } from 'next/router';

const ProductPage = () => {
  const router = useRouter();
  const { slug  } = router.query;

  return <h1>Product ID: {slug}</h1>;
};

export default ProductPage;

