import React from "react";
import { Link } from "react-router-dom";

export default function Product(prop) {
  const { product, wishList, setWishList } = prop;

  function addToFav(product) {
    // setWishList(wishList.push(product));
    // check if product inside/include in the wishList array
    // JS method: some
    // boolean
    const isInclude = wishList.some((item) => item.id === product.id);
    if (!isInclude) {
      setWishList([...wishList, product]);
    }
  }
  // 1 => 1
  // "a" => "a"
  // [] => location
  // [...array,product]

  // cart
  // {...product, quantity: 1}
  return (
    <div>
      <p>{product.title}</p>
      <p>{product.price}$</p>
      <Link to={`${product.id}`}>
        <button>More detail</button>
      </Link>
      <button onClick={() => addToFav(product)}>Add to fav </button>
    </div>
  );
}
