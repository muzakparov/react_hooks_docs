import React, { useImperativeHandle, useRef } from "react";

function FancyInput(props, ref) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} type="text" />;
}

export default React.forwardRef(FancyInput);
