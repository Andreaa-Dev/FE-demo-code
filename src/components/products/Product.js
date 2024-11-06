import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Snackbar, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Product(prop) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [open, setOpen] = useState(false);

  const { product, wishList, setWishList, cartList, setCartList } = prop;

  function addToFav(product) {
    const isInclude = wishList.some((item) => item.id === product.id);
    if (!isInclude) {
      setWishList([...wishList, product]);
      setIsFavorited(true);
      setOpen(true);
    }
  }

  // cart : product + quantity
  // [...cartList, {product: product, quantity: 1}]

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // add to cart
  function addToCart(product) {
    // [product1, product 2]
    // [{name: "product1",price:18.75 , quantity: 1}]
    // [], {} => ref
    // setCartList([...cartList, product]);

    const isInclude = cartList.some((item) => item.id === product.id);
    if (!isInclude) {
      setCartList([...cartList, { ...product, quantity: 1 }]);
    }
  }
  console.log(cartList, "cart");
  return (
    <div>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}$</p>
      <Button onClick={() => addToCart(product)}> Add to cart </Button>

      <Link to={`${product.id}`}>
        <ArrowForwardIosIcon />
        {/* <button>More detail</button> */}
      </Link>

      <FavoriteIcon
        onClick={() => addToFav(product)}
        sx={{ color: isFavorited ? "red" : "black" }}
      />
      <br />

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={`A ${product.name} is add to wish list`}
      />
    </div>
  );
}
