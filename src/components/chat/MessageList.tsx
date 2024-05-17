import type { FC } from "react";
import { Chat } from "../../socket";
import { Box } from "@mui/material";
import MessageItem from "./MessageItem";

interface MessageListProps {
  loading: boolean;
  messages: Chat[];
  isUser: boolean;
}

const MessageList: FC<MessageListProps> = (props) => {
  const { loading, messages, isUser } = props;
  return (
    <Box
      padding={"1rem"}
      display={"flex"}
      gap={1}
      flexDirection={"column"}
      flex={1}
      justifyContent={"end"}
      minHeight="100%"
    >
      {loading && <h1>Loading...</h1>}
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
