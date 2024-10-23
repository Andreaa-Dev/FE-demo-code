import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { productId } = useParams();
  // console.log(useParams(), "params");
  // console.log(random, "random");

  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productDetailUrl = `https://fakestoreapi.com/products/${productId}`;

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

  return (
    <div>
      <h1>ProductDetail </h1>
      <p> {productDetail.title}</p>
    </div>
  );
}