import React from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

import "./NavBar.css";

import logo from "../../images/logo.png";

export default function NavBar(prop) {
  const { wishList } = prop;
  // badgeContent = number of item in wishList
  // [] => nameArray.length
  const arrayLength = wishList.length;
  console.log(arrayLength, "length");

  return (
    <nav className="nav">
      <img src={logo} alt="logo" />

      <ul className="navList">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        <Badge badgeContent={arrayLength} color="primary">
          <Link to="/wishList">Wish List</Link>
        </Badge>
        <Link to="/cart">Cart</Link>
      </ul>
    </nav>
  );
}

let smt = 2;
export { smt };
