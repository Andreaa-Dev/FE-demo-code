import React from "react";
import Button from "@mui/material/Button";

import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to Our E-commerce Store</h1>
      <h3>Discover the best products for your needs.</h3>
      {/* <button> Shop now</button> */}

      {/* <Button color="purple">Secondary</Button> */}
      <Button variant="outlined" color="custom">
        Shop now
      </Button>
    </div>
  );
}
