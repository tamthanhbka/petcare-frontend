import { Box, Tooltip, Typography } from "@mui/material";
import type { FC } from "react";
import { Chat } from "../socket";

interface MessageProps {
  isMe: boolean;
  message: Chat;
}

const Message: FC<MessageProps> = ({ isMe, message }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      justifyContent={isMe ? "end" : "start"}
    >
      {/* {!isMe && <Avatar sx={{ width: 30, height: 30 }} src={avt} />} */}
      <Box
        sx={{
          bgcolor: isMe ? "#4e7df6" : "#E4E6EB",
          py: 1,
          px: 2,
          borderRadius: 3,
          color: isMe ? "white" : "black",
        }}
      >
        <Tooltip title={"20-1-2024"}>
          <Typography sx={{ fontSize: 14 }}>{message.content}</Typography>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Message;
