import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect
} from "react";
import { FarContext } from "./App";

import useTimer from "./hooks/useTimer";
import Child from "./Child";
import ChildPure from "./ChildPure";

export default function Example(props) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [countX, setCountX] = useState(props.initialCount);
  const [sameCount, setSameCount] = useState(5);
  const [fruit, setFruit] = useState("apple");

  const [lazyState, setLazyState] = useState(() => {
    console.log("someExpensiveComputation");
    const initialState = someExpensiveComputation();
    return initialState;
  });

  function updateTitle() {
    console.log("effect count");
    document.title = count;
  }

  useEffect(updateTitle, [count]);

  const [timer, setTimer] = useTimer();

  useEffect(() => {
    console.log("empty deps mount");

    return () => {
      console.log("empty deps unmount");
    };
  }, []);

  useEffect(() => {
    console.log("useEffect");
  });

  const farContext = useContext(FarContext);

  //redux
  function init(initialCountRedux) {
    return { countRedux: initialCountRedux };
  }

  function reducer(state, action) {
    switch (action.type) {
      case "incr":
        return { countRedux: state.countRedux + 1 };
      case "decr":
        return { countRedux: state.countRedux - 1 };
      case "reset":
        return init(action.payload);
      default:
        throw new Error();
    }
  }

  const initialCountRedux = { countRedux: 0 };

  const [stateRedux, dispatch] = useReducer(reducer, initialCountRedux);

  //
  function doSomething(a) {
    console.log("doSomething");
    return "doSomething";
  }

  const memoizedCallback = useCallback(() => {
    console.log("ddddddddd", count);
    return doSomething(count);
  }, [count]);

  //
  function computeExpensiveValue(a, b) {
    return a + b;
  }
  const memoizedValue = useMemo(() => {
    console.log("memoizedValue");

    return computeExpensiveValue(count, countX);
  }, [count, countX]);

  //
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };

  //
  useLayoutEffect(() => {
    //debugger;
    console.log("useLayoutEffect");
  });

  console.log("first", farContext, inputEl);
  return (
    <div>
      <ChildPure doSomething={memoizedCallback} value={memoizedValue} />
      <Child doSomething={memoizedCallback} />
      <p>initialState: {lazyState}</p>
      <p>Count: {count}</p>
      <p>Count correct: {countX}</p>
      <p>Same Count: {sameCount}</p>
      <p>fruit: {fruit}</p>
      <button onClick={() => setCount(count + 1)}>Incr</button>
      <button onClick={() => setCountX(prevCount => prevCount + 1)}>
        IncrX
      </button>
      <button onClick={() => setSameCount(5)}>Same Incr</button>
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
      <div>xxxxxxxxxxxxx</div>
      <p>Redux Count: {stateRedux.countRedux}</p>
      <button onClick={() => dispatch({ type: "incr" })}> +</button>
      <button onClick={() => dispatch({ type: "decr" })}> -</button>
      <button onClick={() => dispatch({ type: "reset", payload: 0 })}>
        {" "}
        reset
      </button>

      <div>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </div>
    </div>
  );
}

function someExpensiveComputation() {
  console.log("xxxx someExpensiveComputation");

  for (let i = 0; i < 1000000; i++) {
    const a = 1 + 1;
  }

  return "initialState";
}
