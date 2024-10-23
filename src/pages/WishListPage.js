import React from "react";
import WishList from "../components/wishList/WishList";

export default function WishListPage(prop) {
  const { wishList } = prop;
  return (
    <div>
      WishListPage
      <WishList wishList={wishList} />
    </div>
  );
}
