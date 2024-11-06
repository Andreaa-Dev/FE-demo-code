import React from "react";

export default function OrderDetail(prop) {
  const { item } = prop;

  return (
    <div>
      <p> Name: {item.product.name}</p>
      <p> Quantity:{item.quantity} </p>
    </div>
  );
}
