import React from "react";
import NavBar from "../nav/NavBar";
import { Outlet } from "react-router-dom";

export default function LayOut(prop) {
  const { wishList, isAuthenticated, userData } = prop;

  return (
    <>
      <NavBar
        wishList={wishList}
        isAuthenticated={isAuthenticated}
        userData={userData}
      />
      <Outlet />
    </>
  );
}
