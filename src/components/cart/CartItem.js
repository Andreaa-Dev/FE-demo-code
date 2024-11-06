import React from "react";
import { Button } from "@mui/material";

export default function CartItem(prop) {
  const { cart, cartList, setCartList } = prop;

  function increaseProductQuantity(id) {
    const newCartList = cartList.map((item) => {
      // if (item.stockQuantity> item.quantity){}
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartList(newCartList);
  }

  function decreaseProductQuantity(id) {
    const newCartList = cartList.map((item) => {
      if (item.quantity === 1) {
        return item;
      }
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartList(newCartList);
  }

  // delete product from cartList
  function removeProduct(cart) {
    setCartList(cartList.filter((cartItem) => cartItem.id !== cart.id));
  }
  return (
    <div>
      <p>Name: {cart.name}</p>
      <p>Price: {cart.price}</p>
      <Button
        variant="contained"
        onClick={() => increaseProductQuantity(cart.id)}
      >
        +
      </Button>
      <p> Quantity: {cart.quantity}</p>
      <Button
        variant="contained"
        onClick={() => decreaseProductQuantity(cart.id)}
      >
        -
      </Button>

      <Button variant="contained" onClick={() => removeProduct(cart)}>
        Delete
      </Button>
    </div>
  );
}
