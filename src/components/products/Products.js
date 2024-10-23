import React from "react";
import "./Products.css";
import Product from "./Product";

export default function Products(prop) {
  const { productList, userInput, wishList, setWishList } = prop;

  const result = productList.filter((product) =>
    product.title.toLowerCase().includes(userInput.toLowerCase())
  );

  let products = productList;
  if (userInput) {
    products = result;
  }

  return (
    <div>
      <h1> Product List</h1>
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            product={product}
            wishList={wishList}
            setWishList={setWishList}
          />
        );
      })}
    </div>
  );
}
