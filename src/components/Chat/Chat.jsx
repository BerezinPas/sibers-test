import { useState } from "react";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { ChatInfo } from "../ChatInfo/ChatInfo";
import { ChatInputWrapper } from "../ChatInputWrapper/ChatInputWrapper";
import { Messages } from "../Messages/Messages";
import "./Chat.css";

export function Chat({ UsersId, onDelete, ...props }) {
  const [chatInfoIsOpen, setChatInfoIsOpen] = useState(
    () => window.innerWidth > 800
  );

  return (
    <div className="Chat">
      <div className="Chat-window">
        <ChatHeader
          {...props}
          numberOfMembers={UsersId.length}
          onClick={() => setChatInfoIsOpen(true)}
        />
        <Messages UsersId={UsersId} {...props} />
      </div>
      <ChatInfo
        {...props}
        UsersId={UsersId}
        onDelete={onDelete}
        isOpen={chatInfoIsOpen}
        onClose={() => setChatInfoIsOpen(false)}
      />
    </div>
  );
}
