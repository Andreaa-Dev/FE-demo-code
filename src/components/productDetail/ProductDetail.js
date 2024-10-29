import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

export default function ProductDetail() {
  const { productId } = useParams();

  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productDetailUrl = `http://localhost:5291/api/v1/products/${productId}`;

  function fetchProductDetail() {
    axios
      .get(productDetailUrl)
      .then((response) => {
        setProductDetail(response.data);
        setLoading(false);
      })

      .catch((error) => {
        setError("Error");
        setLoading(true);
      });
  }

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  if (loading) {
    return (
      <div>
        <p> Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  // function addToFav(product) {
  //   const isInclude = wishList.some((item) => item.id === product.id);
  //   if (!isInclude) {
  //     setWishList([...wishList, product]);
  //     setIsFavorited(true);
  //   }
  // }

  return (
    <div>
      <h1>ProductDetail </h1>
      <p> {productDetail.name}</p>
      <p> {productDetail.description}</p>
      <p> {productDetail.price} $</p>
      <img src={productDetail.imageUrl} alt={productDetail.name} />
      <Link to="/products">
        <Button> Go back</Button>
      </Link>
      {/* <FavoriteIcon
        onClick={() => addToFav(product)}
        sx={{ color: isFavorited ? "red" : "black" }}
      /> */}
    </div>
  );
}
