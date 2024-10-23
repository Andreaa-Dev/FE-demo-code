import React, { useState } from "react";

export default function Counter() {
  // prop
  // prop = {counter: 8}

  //   let count = 0;

  //   // logic to increase value of count
  //   function counterFunction() {
  //     count++;
  //     // count = count +1
  //     console.log(count);
  //     return count;
  //   }

  // React hook:  useState
  // syntax of useState
  // useState() - initial value
  // initial value: 0
  // 1st: current value = 1
  // 2nd = 2
  // setCount: update the value of count
  const [count, setCount] = useState(8);

  function updateCount() {
    // update value of count
    // how = increase by 1 = count +1
    // tell React about the change
    // 0 => 1

    setCount(count + 1);
  }

  // form
  // fetch data
  return (
    <div>
      <h1> Counter</h1>

      {/* <button onClick={counterFunction}>Increase value of counter</button> */}
      <button onClick={updateCount}>Increase value of counter </button>
      <p> Result: {count}</p>
    </div>
  );
}
