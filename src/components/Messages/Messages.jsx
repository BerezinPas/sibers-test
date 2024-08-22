import { useEffect, useRef, useState } from "react";
import { ChatInputWrapper } from "../ChatInputWrapper/ChatInputWrapper";
import { Message } from "../Message/Message";
import data from "../../assets/users.json";
import "./Messages.css";

export function Messages({ UsersId, MY_ID }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([]);
  }, [UsersId]);
  const messagesRef = useRef();

  function onSubmitHandler(e) {
    if (e.target.ChatInput.value.trim() === "") {
      return;
    }
    setMessages((messages) => [
      ...messages,
      {
        title: data.find((user) => user.id === MY_ID).name,
        text: e.target.ChatInput.value,
        isOwn: true,
      },
    ]);

    createRandomMessage();
    setTimeout(() => {
      messagesRef.current.scrollBy(0, messagesRef.current.scrollHeight);
    }, 0);
  }

  function createRandomMessage() {
    if (UsersId.length === 1) {
      return;
    }

    function random(max) {
      return Math.floor(Math.random() * max);
    }

    const filtredUsersId = UsersId.filter((userId) => userId !== MY_ID);
    const id = filtredUsersId[random(filtredUsersId.length)];
    const user = data.find((user) => user.id === id);

    setMessages((messages) => [
      ...messages,
      {
        title: user.name,
        text: user.posts[0].sentence,
        isOwn: false,
      },
    ]);
  }
  return (
    <>
      <div ref={messagesRef} className="Messages">
        {messages.map((message) => (
          <Message {...message} />
        ))}
      </div>
      <ChatInputWrapper onSubmit={onSubmitHandler} />
    </>
  );
}
