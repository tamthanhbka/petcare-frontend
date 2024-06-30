import { styled } from "@mui/material";
import { useEffect, useRef, type FC } from "react";
import { Chat } from "../../socket";
import MessageItem from "./MessageItem";
const Box = styled("div")();

interface MessageListProps {
  loading: boolean;
  messages: Chat[];
  isUser: boolean;
}

const MessageList: FC<MessageListProps> = (props) => {
  const { messages, isUser } = props;
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    boxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <Box ref={boxRef} sx={{ padding: "1rem", flex: 1, overflow: "auto" }}>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          content={message.content}
          isMe={isUser ? message.isFromUser : !message.isFromUser}
        />
      ))}
    </Box>
  );
};

export default MessageList;
