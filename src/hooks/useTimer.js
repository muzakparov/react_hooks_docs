import { useState, useEffect, useDebugValue } from "react";

export default function useTimer() {
  useDebugValue("XXXX");
  const [timer, setTimer] = useState(3000);

  function logTime() {
    console.log("time");
  }

  useEffect(() => {
    const intervalId = setInterval(logTime, timer);

    return () => {
      clearInterval(intervalId);
    };
  });

  return [timer, setTimer];
}
