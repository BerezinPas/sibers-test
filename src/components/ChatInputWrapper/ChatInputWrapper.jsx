import { useEffect, useRef, useState } from "react";
import "./ChatInputWrapper.css";

export function ChatInputWrapper({ onSubmit }) {
  const buttonRef = useRef();
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState();
  const [rightPadding, setRightPadding] = useState();

  useEffect(() => {
    setRightPadding(`${buttonRef.current.offsetWidth + 32}px`);
  }, [buttonRef]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
        inputRef.current.value = "";
        setInputValue("");
        inputRef.current.focus();
      }}
      className="ChatInputWrapper"
    >
      <input
        onInput={(e) => setInputValue(e.target.value)}
        ref={inputRef}
        value={inputValue}
        name="ChatInput"
        className="Input"
        type="text"
        style={{ paddingRight: rightPadding }}
      />
      <button ref={buttonRef} className="Button Button_send">
        send
      </button>
    </form>
  );
}
