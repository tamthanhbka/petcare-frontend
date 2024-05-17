import { Box, Typography } from "@mui/material";
import type { FC } from "react";

interface MessageItemProps {
  content: string;
  isMe: boolean;
}

const MessageItem: FC<MessageItemProps> = (props) => {
  const { content, isMe } = props;
  return !isMe ? (
    <Box
      bgcolor={"white"}
      maxWidth={"50%"}
      padding={"0.5rem"}
      borderRadius={"1rem"}
      boxShadow={"4px 4px 8px #e1e1e1"}
    >
      <Typography sx={{ wordBreak: "break-word" }}>{content}</Typography>
    </Box>
  ) : (
    <Box
      bgcolor={"#f89c5a"}
      maxWidth={"60%"}
      display="flex"
      padding="0.5rem"
      borderRadius={"1rem"}
      boxShadow={"4px 4px 8px #e1e1e1"}
      alignSelf={"flex-end"}
    >
      <Typography sx={{ wordBreak: "break-word" }}>{content}</Typography>
    </Box>
  );
};

export default MessageItem;
