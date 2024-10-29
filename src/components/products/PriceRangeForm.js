import React from "react";
import TextField from "@mui/material/TextField";

export default function PriceRangeForm(prop) {
  const { setMinPrice, setMaxPrice } = prop;

  function onChangeHandlerMinPrice(event) {
    setMinPrice(event.target.value);
  }

  function onChangeHandlerMaxPrice(event) {
    setMaxPrice(event.target.value);
  }
  return (
    <div>
      <TextField
        id="standard-basic-min"
        label="Min price"
        variant="standard"
        helperText="Enter min price"
        type="number"
        onChange={onChangeHandlerMinPrice}
      />
      <TextField
        id="standard-basic-max"
        label="Max price"
        variant="standard"
        helperText="Enter max price"
        type="number"
        onChange={onChangeHandlerMaxPrice}
      />
    </div>
  );
}
