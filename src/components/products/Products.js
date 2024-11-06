import React from "react";

import "./Products.css";
import Product from "./Product";
import ProductsPagination from "./ProductsPagination";

export default function Products(prop) {
  const {
    productList,
    wishList,
    setWishList,
    totalCount,
    page,
    handleChange,
    cartList,
    setCartList,
  } = prop;
  return (
    <div>
      <h1> Product List</h1>
      <div className="productList">
        {productList.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              wishList={wishList}
              setWishList={setWishList}
              cartList={cartList}
              setCartList={setCartList}
            />
          );
        })}
      </div>

      <ProductsPagination
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
      />
    </div>
  );
}
