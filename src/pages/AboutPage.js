import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AboutPage() {
  return (
    <div>
      <h1> AboutPage</h1>
      <p> This is from About page</p>
      <Link to="example">Go to example</Link>
      <Outlet />
    </div>
  );
}
