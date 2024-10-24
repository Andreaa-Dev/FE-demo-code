import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./Products.css";
import Product from "./Product";

export default function Products(prop) {
  // const [isFavorited, setIsFavorited] = useState(false);

  function addToFav(product) {
    const isInclude = wishList.some((item) => item.id === product.id);
    if (!isInclude) {
      setWishList([...wishList, product]);
      // setIsFavorited(true);
    }
  }
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
      {/* <h1> Product List</h1> */}
      <div className="productList">
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

      {/* apply the red color for all products */}
      {/* <div className="productList">
        {products.map((product) => {
          return (
            <div>
              <p> {product.title}</p>

              <FavoriteIcon
                onClick={() => addToFav(product)}
                sx={{ color: isFavorited ? "red" : "black" }}
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
