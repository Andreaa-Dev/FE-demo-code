import React from "react";
import TextField from "@mui/material/TextField";

export default function Form(prop) {
  const { setUserInput } = prop;

  function onChangeHandler(event) {
    setUserInput(event.target.value);
  }

  return (
    <div>
      {/* <h1> Form</h1> */}
      {/* <form>
        <label>Please enter product name: </label>
        <input type="text" onChange={onChangeHandler} />
      </form> */}

      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        helperText="Enter a product title"
        onChange={onChangeHandler}
      />
    </div>
  );
}
