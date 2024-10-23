import React from "react";
import WishListItem from "./WishListItem";

export default function WishList(prop) {
  const { wishList } = prop;

  if (wishList.length === 0) {
    return <p> The wish list is empty.</p>;
  }
  return (
    <div>
      <h1> WishList</h1>
      {wishList.map((item) => {
        return <WishListItem key={item.id} item={item} />;
      })}
    </div>
  );
}
