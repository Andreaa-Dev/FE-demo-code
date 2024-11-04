import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

export default function ProductItem(prop) {
  const { product, fetchData } = prop;

  function deleteProductById() {
    const token = localStorage.getItem("token");
    // send request to backend
    const url = `http://localhost:5291/api/v1/products/${product.id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          alert("a product is deleted successfully!");
          fetchData();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <p> {product.name}</p>
      <p> {product.price}</p>
      <Button onClick={deleteProductById}> Delete</Button>
    </div>
  );
}
