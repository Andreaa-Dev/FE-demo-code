import React from "react";
import NavBar from "../nav/NavBar";
import { Outlet } from "react-router-dom";

export default function LayOut(prop) {
  const { wishList } = prop;

  return (
    <>
      <NavBar wishList={wishList} />
      <Outlet />
    </>
  );
}
