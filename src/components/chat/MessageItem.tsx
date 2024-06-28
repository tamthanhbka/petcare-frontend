import { Box, Typography } from "@mui/material";
import type { FC } from "react";

interface MessageItemProps {
  content: string;
  isMe: boolean;
}

const MessageItem: FC<MessageItemProps> = (props) => {
  const { content, isMe } = props;
  return (
    <Box textAlign={!isMe ? "left" : "right"} width={"100%"} mt={1}>
      {!isMe ? (
        <Box
          flexShrink={0}
          bgcolor={"white"}
          maxWidth={"50%"}
          padding={"0.5rem"}
          borderRadius={"1rem"}
          boxShadow={"4px 4px 8px #e1e1e1"}
          display="inline-flex"
        >
          <Typography sx={{ wordBreak: "break-word" }}>{content}</Typography>
        </Box>
      ) : (
        <Box
          bgcolor={"#f89c5a"}
          maxWidth={"60%"}
          display="inline-flex"
          padding="0.5rem"
          borderRadius={"1rem"}
          boxShadow={"4px 4px 8px #e1e1e1"}
          color="white"
        >
          <Typography sx={{ wordBreak: "break-word" }}>{content}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MessageItem;
