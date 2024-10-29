import React, { useState } from "react";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Rating from "@mui/material/Rating";

export default function Product(prop) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [open, setOpen] = useState(false);

  const { product, wishList, setWishList } = prop;

  function addToFav(product) {
    const isInclude = wishList.some((item) => item.id === product.id);
    if (!isInclude) {
      setWishList([...wishList, product]);
      setIsFavorited(true);
      setOpen(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}$</p>
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
