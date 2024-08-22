import { UserInfo } from "./UserInfo/UserInfo";
import data from "../assets/users.json";
import { Channel } from "./Channel/Channel";
import { ChannelControl } from "./ChannelControl/ChannelControl";
import { Chat } from "./Chat/Chat";
import { FormCreateChat } from "./FormCreateChat/FormCreateChat";
import { useState, useEffect } from "react";

const MY_ID = data[0].id;
const chatsData = [
  {
    id: 1,
    name: "test",
    UsersId: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    isAdmin: false,
  },
  {
    id: 2,
    name: "MyChat",
    UsersId: [0, 1, 23, 34, 45, 52, 61],
    isAdmin: true,
  },
  {
    id: 3,
    name: "all users",
    UsersId: data.map((user) => user.id),
    isAdmin: true,
  },
  {
    id: 4,
    name: "wtihOut me",
    UsersId: [1, 23, 34, 45, 52, 61],
    isAdmin: false,
  },
];

export function RealTimeChat(props) {
  const [channelsIsOpen, setChannelsIsOpen] = useState(true);

  const [formChat, setFormChat] = useState();
  const [chats, setChats] = useState(() =>
    chatsData.filter((chat) => chat.UsersId.includes(MY_ID))
  );
  const [activeChatId, setActiveChatId] = useState(chatsData[0].id);
  const [error, setError] = useState("");

  // function to remove a user from a chat
  function handleDelete(userId) {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat?.id === activeChatId) {
          return {
            ...chat,
            UsersId: chat.UsersId.filter((id) => id !== userId),
          };
        }
        return chat;
      })
    );
  }
  // function for creating a chat

  function formCreateChatHandler(e) {
    setError("");

    e.preventDefault();
    const name = e.target.FormCreateChatInput.value.trim();
    if (!name) {
      setError("Chat name must not be empty");
      return;
    }

    const newChat = {
      id: Date.now(),
      name: name,
      UsersId: [MY_ID],
      isAdmin: true,
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
    setFormChat("");
  }

  // function for connecting  a chat
  function formAddChatHandler(e) {
    setError("");
    const value = Number(e.target.FormCreateChatInput.value);
    e.preventDefault();

    const index = chatsData.findIndex((chat) => chat.id === value);
    if (index === -1) {
      setError(() => "Chat with such ID does not exist!");
      e.target.FormCreateChatInput.value = "";
      e.target.FormCreateChatInput.focus();
      return;
    }
    const newChats = [...chatsData];
    if (newChats[index].UsersId.includes(MY_ID)) {
      setActiveChatId(chatsData[index].id);
      setFormChat("");
      return;
    }
    newChats[index].UsersId.push(MY_ID);
    setChats([...newChats]);
    setActiveChatId(value);
    setFormChat("");
  }

  return (
    <div className="RealTimeChat">
      <div className={`RealTimeChat__left ${channelsIsOpen ? "active" : ""}`}>
        <UserInfo {...data[0]} />
        <ul className="Channels">
          {chats.map((chat) => (
            <Channel
              {...chat}
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
            />
          ))}
        </ul>
        <ChannelControl
          onAdd={() => {
            setError("");
            setFormChat("add");
          }}
          onCreate={() => {
            setError("");
            setFormChat("create");
          }}
        />
        {formChat === "create" && (
          <FormCreateChat
            title={"Creating Chat"}
            placeholderInput={"Enter chat name"}
            buttonText={"Create"}
            onClose={() => setFormChat("")}
            onSubmit={formCreateChatHandler}
            error={error}
          />
        )}
        {formChat === "add" && (
          <FormCreateChat
            title={"connect to chat"}
            placeholderInput={"Enter chat Id"}
            buttonText={"connect"}
            onClose={() => setFormChat("")}
            onSubmit={formAddChatHandler}
            error={error}
          />
        )}
      </div>
      {chats.find((el) => el.id === activeChatId) && (
        <Chat
          {...chats.find((el) => el.id === activeChatId)}
          onDelete={handleDelete}
          MY_ID={MY_ID}
          isOpen={channelsIsOpen}
          onTogleChannelsPanel={() => setChannelsIsOpen((prev) => !prev)}
        />
      )}
    </div>
  );
}
