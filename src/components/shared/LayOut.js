import React from "react";
import NavBar from "../nav/NavBar";
import { Outlet } from "react-router-dom";

export default function LayOut() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
