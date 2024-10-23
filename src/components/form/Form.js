import React from "react";

export default function Form(prop) {
  const { setUserInput } = prop;

  function onChangeHandler(event) {
    setUserInput(event.target.value);
  }

  return (
    <div>
      <h1> Form</h1>
      <form>
        <label>Please enter product name: </label>
        <input type="text" onChange={onChangeHandler} />
      </form>
    </div>
  );
}
