import React from "react";

export default function WishListItem(prop) {
  const { item } = prop;
  return (
    <div>
      <p> Name: {item.name}</p>
      <p> Price: {item.price} $</p>
    </div>
  );
}
