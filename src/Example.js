import React, { useState, useEffect, useContext } from "react";
import { FarContext } from "./App";
import useTimer from "./hooks/useTimer";

export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [fruit, setFruit] = useState("apple");

  function updateTitle() {
    console.log("effect count");
    document.title = count;
  }

  useEffect(updateTitle, [count]);

  const [timer, setTimer] = useTimer();

  useEffect(() => {
    console.log("empty deps");
  }, []);

  useEffect(() => {
    console.log("useEffect");
  });

  const farContext = useContext(FarContext);

  console.log("first", farContext);
  return (
    <div>
      <p>Count: {count}</p>
      <p>fruit: {fruit}</p>
      <button onClick={() => setCount(count + 1)}>Incr</button>
      <button
        onClick={() =>
          setFruit(fruit => {
            if (fruit === "apple") return "orange";
            return "apple";
          })
        }
      >
        {fruit}
      </button>
      <input
        type="number"
        step={1000}
        onChange={e => {
          setTimer(Number(e.target.value));
          console.log("e", typeof e.target.value);
        }}
        value={timer}
      />
    </div>
  );
}
