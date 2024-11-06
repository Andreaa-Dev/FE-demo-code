import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

export default function CartList(prop) {
  const { cartList, setCartList, userData } = prop;

  const navigate = useNavigate();

  if (cartList.length === 0) {
    return (
      <div>
        <h1> Cart is empty</h1>
        <Button>
          <Link to="/products"> Check out our Christmas collection </Link>
        </Button>
      </div>
    );
  }

  // calculate the total cart - reduce
  const totalPrice = cartList.reduce((acc, item) => {
    // sum of each cart item = price * quantity
    const result = acc + item.price * item.quantity;
    // first : 0 +  18.75 * 1 = 18.75
    // second: 18.75 +  26.7* 1 =

    // return result;
    return Math.round(result);
  }, 0);

  // transform data: cartList => orderDetail
  // cartList => OrderDetails: quantity + productId
  // body: { OrderDetails: [orderdetail]}
  // body: { OrderDetails: [{quantity: number,productId:Guid},{quantity: number,productId:Guid}]}
  // cartList: [{quantity: number, name: string, price: number, description: string, imageUrl: string }, {quantity: number, name: string, price: number, description: string, imageUrl: string }]
  const orderDetails = cartList.map((item) => {
    return { quantity: item.quantity, productId: item.id };
  });

  const token = localStorage.getItem("token");
  // check out
  function checkOut() {
    // check if user is log in
    if (!userData) {
      alert("Please log in checkout");
      navigate("/login");
      return;
    }

    // send request to backend to create order
    // token
    // body: OrderDetails: quantity + productId
    const orderUrl = "http://localhost:5291/api/v1/orders";
    axios
      .post(
        orderUrl,
        { OrderDetails: orderDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res, "order list");

        if (res.status === 200) {
          alert("Order is created successfully! ");
          navigate("/products");
          setCartList([]);
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <h1> Cart </h1>
      {cartList.map((cart) => {
        return (
          <CartItem
            key={cart.id}
            cart={cart}
            cartList={cartList}
            setCartList={setCartList}
          />
        );
      })}
      <p> Total price: {totalPrice}</p>
      <Button onClick={checkOut}> Checkout</Button>
    </div>
  );
}
