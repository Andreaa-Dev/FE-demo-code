import React from "react";
import { Link } from "react-router-dom";
import ProductDashBoard from "./ProductDashBoard";

export default function DashBoard() {
  return (
    <div>
      <h1> DashBoard</h1>
      {/* <ProductDashBoard /> */}
      {/* <UserDashBoard /> */}
      {/* <OrderDashBoard /> */}

      <Link to="/product-dashboard"> Products</Link>
      <p> Users</p>
      <p> Orders</p>
    </div>
  );
}
