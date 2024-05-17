import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ModalProps,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Message } from "../components";
import { useAuth } from "./Auth";

interface ChatProps extends Omit<ModalProps, "children"> {
  onClose?: () => void;
  shopId: number;
  shopName: string;
}

const Chat: FC<ChatProps> = (props) => {
  const { onClose, shopName, shopId } = props;
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const chat = form.get("chat");
    if (!chat || typeof chat !== "string") return;
    e.currentTarget.reset();
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      // justifyContent={"center"}
      alignItems={"center"}
      height={500}
      width="25%"
      sx={{
        position: "fixed",
        bottom: 15,
        right: 20,
        borderRadius: "12px 12px 0 0",
        boxShadow: "0px 0px 5px 0px #6c6c6c",
        zIndex: 101,
      }}
      bgcolor="#f2f2f2"
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        borderBottom="1px solid #e0e0e0"
        padding="10px 10px"
        width={"100%"}
        position={"relative"}
      >
        <Avatar sx={{ width: 35, height: 35 }} src="" />
        <Typography fontSize={16} fontWeight={600}>
          {shopName ?? "Unknown"}
        </Typography>

        <IconButton sx={{ position: "absolute", right: 10 }} onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Box
        width={"95%"}
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            bgcolor: "transparent",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#aaaa",
            borderRadius: 5,
          },
        }}
      ></Box>
      <Box sx={{ width: "100%", padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="chat"
            id="outlined-start-adornment"
            sx={{ width: "100%" }}
            placeholder="Nhập tin nhắn..."
          />
        </form>
      </Box>
    </Box>
  );
};

export default Chat;
