import React from "react";

export default function WishList(prop) {
  const { wishList } = prop;

  if (wishList.length === 0) {
    return <p> The wish list is empty.</p>;
  }
  return (
    <div>
      <h1> WishList</h1>
      {wishList.map((item) => {
        return (
          <div>
            <p> {item.title}</p>
            <p> {item.price}</p>
          </div>
        );
      })}
    </div>
  );
}
