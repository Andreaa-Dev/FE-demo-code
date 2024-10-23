import React from "react";

import Products from "../components/products/Products";
import Form from "../components/form/Form";

export default function ProductsPage(prop) {
  const { productList, setUserInput, userInput, wishList, setWishList } = prop;
  return (
    <div>
      <Form setUserInput={setUserInput} />
      <Products
        productList={productList}
        userInput={userInput}
        wishList={wishList}
        setWishList={setWishList}
      />
    </div>
  );
}
