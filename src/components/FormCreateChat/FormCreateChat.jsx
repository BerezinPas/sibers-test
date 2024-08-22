import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import "./FormCreateChat.css";

export function FormCreateChat({
  title,
  buttonText,
  placeholderInput,
  onClose,
  onSubmit,
  error,
  ...props
}) {
  const formRef = useRef();
  const inputRef = useRef();
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    if (error) {
      setIsValid(inputRef.current?.value.trim() !== "" && !error);
    }
  }, [error]);
  setTimeout(() => {
    if (formRef.current) {
      formRef.current.classList.add("active");
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div ref={formRef} className="FormCreateChat-wrapper ">
      <form onSubmit={(e) => onSubmit(e)} action="#" className="FormCreateChat">
        <label htmlFor="FormCreateChatInput" className="FormCreateChat__label">
          {title}
          <Button
            type="button"
            onClick={() => {
              formRef.current.classList.remove("active");
              setTimeout(() => {
                onClose();
              }, 250);
            }}
            className="FormCreateChat__close"
          >
            x
          </Button>
        </label>
        <input
          ref={inputRef}
          onInput={(e) => {
            if (e.target.value.trim()) {
              setIsValid(() => true);
            } else {
              setIsValid(() => false);
            }
          }}
          type="text"
          name="FormCreateChatInput"
          id="FormCreateChatInput"
          className="FormCreateChat__input"
          placeholder={placeholderInput}
        />
        <Button
          name="submit"
          type="submit"
          className="Button FormCreateChat__button "
          disabled={!isValid}
        >
          {buttonText}
        </Button>
        {error !== "" && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
