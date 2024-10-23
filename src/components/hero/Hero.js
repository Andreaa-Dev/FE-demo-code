import React from "react";

export default function Hero(prop) {
  console.log(prop);
  // prop = {oddNumber: 7}

  return (
    <div>
      <h1> Welcome to e-commerce</h1>
      <h3> New product for Autumn</h3>
      <button> Buy now</button>

      <div> prop value: {prop.oddNumber}</div>
    </div>
  );
}
