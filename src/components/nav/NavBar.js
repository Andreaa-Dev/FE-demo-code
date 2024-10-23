import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

import logo from "../../images/logo.png";

export default function NavBar() {
  return (
    <nav className="nav">
      <img src={logo} alt="logo" />

      <ul className="navList">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/wishList">Wish List</Link>
        {/* <Link to="/about">About</Link> */}
      </ul>
    </nav>
  );
}

let smt = 2;
export { smt };
