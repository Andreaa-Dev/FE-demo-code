import React from "react";
import CartList from "../components/cart/CartList";

export default function CartPage(prop) {
  const { cartList, setCartList, userData } = prop;
  return (
    <div>
      <CartList
        cartList={cartList}
        setCartList={setCartList}
        userData={userData}
      />
    </div>
  );
}
