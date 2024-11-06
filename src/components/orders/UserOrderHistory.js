import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import "./UserOrderHistory.css";

export default function UserOrderHistory(prop) {
  const { userData } = prop;
  // fetch order from BE
  // get
  // token
  // userId

  const [orderList, setOrderList] = useState([]);

  function getOrderByUserId() {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5291/api/v1/orders/users/${userData.id}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrderList(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getOrderByUserId();
  }, []);

  if (orderList.length === 0) {
    return <div> No order history </div>;
  }
  return (
    <div className="orderListContainer">
      <h1> UserOrderHistory </h1>
      <div className="orderList">
        {orderList.map((order) => {
          return <OrderItem key={order.id} order={order} />;
        })}
      </div>
    </div>
  );
}
