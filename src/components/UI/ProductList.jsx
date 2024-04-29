import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ data }) => {
  return (
    <>
      {data.map((product, index) => (
        <ProductCard product={product} key={index}/>
      ))}
    </>
  );
};

export default ProductList;
