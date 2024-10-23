import React from "react";

export default function WishListItem(prop) {
  const { item } = prop;
  return (
    <div>
      <p> Name: {item.title}</p>
      <p> Price: {item.price} $</p>
    </div>
  );
}
