import { useEffect, useRef, useDebugValue } from "react";

export default function usePrevious(value, initialValue = "first time") {
  useDebugValue("Custom Hook");

  const prevValueRef = useRef(initialValue);
  useEffect(() => {
    prevValueRef.current = value;
  });

  const prevValue = prevValueRef.current;

  return prevValue;
}
