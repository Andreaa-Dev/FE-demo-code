import React, { useState } from "react";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Rating from "@mui/material/Rating";

export default function Product(prop) {
  // state for changing color
  const [isFavorited, setIsFavorited] = useState(false);
  // state for showing message/notification
  const [open, setOpen] = useState(false);
  // state for rating
  const [value, setValue] = useState(0);

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

  function getRating(event, newValue) {
    setValue(newValue);
  }

  console.log(value, "rating value");

  return (
    <div>
      <p>{product.title}</p>
      <p>{product.price}$</p>
      <Link to={`${product.id}`}>
        <ArrowForwardIosIcon />
        {/* <button>More detail</button> */}
      </Link>
      {/* <button onClick={() => addToFav(product)}>Add to fav </button> */}

      {/* if fav => color to red => grey */}
      <FavoriteIcon
        onClick={() => addToFav(product)}
        sx={{ color: isFavorited ? "red" : "black" }}
      />
      <br />

      {/* <Rating name="simple-controlled" value={value} onChange={getRating} /> */}

      <Rating name="read-only" value={product.rating.rate} readOnly />

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        // message="A product is added to wish list"
        message={`A ${product.title} is add to wish list`}
      />
    </div>
  );
}
