import type { ComponentProps, FC } from "react";
import { Chat } from "../../socket";
import { Avatar, Box, Input, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import MessageList from "./MessageList";

interface MessageBoxProps {
  info: { id: number; name: string; avatar: string };
  loading: boolean;
  messages: Chat[];
  isUser: boolean;
  onSend?: (message: string) => void;
}

const MessageBox: FC<MessageBoxProps> = (props) => {
  const { info, loading, messages, onSend, isUser } = props;
  const handleSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    e.currentTarget.reset();
    const content = form.get("content")?.toString().trim();
    if (!content) return;
    onSend?.(content);
  };
  return (
    <Box
      flex={10}
      bgcolor={"#F3F3F3"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        display={"flex"}
        bgcolor={"white"}
        padding={"0.5rem"}
        borderBottom="1px solid #dbdbdb"
        alignItems={"center"}
        gap={1}
      >
        <Avatar sx={{ width: 35, height: 35 }} src={info.avatar}>
          {info.avatar ? null : info.name.at(0)?.toUpperCase()}
        </Avatar>
        <Typography>{info.name}</Typography>
      </Box>
      <Box sx={{ overflowY: "scroll" }} flex={1}>
        <MessageList loading={loading} messages={messages} isUser={isUser} />
      </Box>

      <Box
        bgcolor={"white"}
        padding={"0.5rem 1rem"}
        borderTop="1px solid #dbdbdb"
        component="form"
        onSubmit={handleSubmit}
      >
        <Input
          name="content"
          fullWidth
          disableUnderline
          autoFocus
          placeholder="Nhập nội dung tin nhắn"
          endAdornment={
            <Send sx={{ color: "#5cc407", cursor: "pointer" }}></Send>
          }
        />
      </Box>
    </Box>
  );
};

export default MessageBox;
