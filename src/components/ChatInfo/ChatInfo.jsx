import "./ChatInfo.css";
import data from "../../assets/users.json";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";

export function ChatInfo({
  UsersId,
  isAdmin,
  onDelete,
  MY_ID,
  isOpen,
  onClose,
}) {
  const refInput = useRef();
  const [input, setInput] = useState("");
  const users = data.filter((user) => UsersId.includes(user.id));
  const ChatInfoRef = useRef();

  return (
    <div ref={ChatInfoRef} className={`ChatInfo ${isOpen ? " active" : ""}`}>
      <h3 className="ChatInfo__title">
        <Button
          type="button"
          onClick={() => onClose()}
          className="ChatInfo__close"
        >
          x
        </Button>
        Участники
      </h3>
      <div className="ChatInfo__inner">
        <input
          ref={refInput}
          type="text"
          placeholder="Введите имя пользователя"
          className="ChatInfo__input"
          onInput={() => setInput(refInput.current.value)}
          value={input}
        />
        <ul className="ChatInfo__users">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(input.toLowerCase())
            )
            .map((user) => {
              if (isAdmin) {
                return (
                  <li key={user.id} className="ChatInfo-user">
                    <div className="ChatInfo-user__name">{user.name}</div>
                    {MY_ID !== user.id && (
                      <button
                        onClick={() => {
                          onDelete(user.id);
                        }}
                        className="ChatInfo-user__delete-btn"
                      >
                        Удалить
                      </button>
                    )}
                  </li>
                );
              }
              return (
                <li key={user.id} className="ChatInfo-user">
                  {user.name}{" "}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
