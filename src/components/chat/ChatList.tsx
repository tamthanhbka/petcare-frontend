import {
  CloseOutlined,
  QuestionAnswer,
  Search,
  Send,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Fab,
  Input,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { useState, type FC } from "react";
import ChatItem from "./ChatItem";
import useRecentChats from "../../hook/useRecentChats";

interface ListChatProps {}

const ChatList: FC<ListChatProps> = () => {
  const [show, setShow] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number>();
  const { chats, loading } = useRecentChats();
  const handleSelectChat = (staffId: number) => setSelectedStaffId(staffId);
  console.log(selectedStaffId + " selected");

  return (
    <>
      <Fab
        sx={{
          position: "fixed",
          bottom: 80,
          right: 30,
          cursor: "pointer",
          zIndex: 0,
        }}
        variant="extended"
        color="info"
        aria-label="add"
        size="medium"
        onClick={() => setShow(true)}
      >
        <QuestionAnswer sx={{ mr: "0.5rem" }} />
        Tin nhắn
      </Fab>
      <Paper
        elevation={2}
        sx={{
          width: "50%",
          position: "fixed",
          top: 150,
          right: 10,
          bottom: 10,
          zIndex: 999,
          display: show ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <Box p="0.5rem" display="flex" justifyContent="space-between">
          <Typography color="#e83d03" fontWeight="530" fontSize={16}>
            Tin nhắn
          </Typography>
          <Box onClick={() => setShow(false)}>
            <CloseOutlined fontSize="small" sx={{ cursor: "pointer" }} />
          </Box>
        </Box>
        <Box flex={1} display="flex" borderTop="1px solid #dbdbdb">
          <Box
            flex={4}
            display="flex"
            flexDirection="column"
            padding={"0.3rem"}
            borderRight="1px solid #dbdbdb"
            overflow="hidden"
            alignItems="stretch"
          >
            <OutlinedInput
              size="small"
              sx={{ mb: "1rem" }}
              placeholder="Tìm kiếm"
              startAdornment={
                <Search sx={{ color: "#aaa", marginRight: "0.5rem" }}></Search>
              }
            ></OutlinedInput>
            <Box display="flex" flexDirection="column" gap={0.1}>
              {chats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  name={chat.shop.name}
                  createdAt={chat.createdAt}
                  lastMessage={chat.content}
                  avatar={chat.shop.avatar}
                  onClick={() => handleSelectChat(chat.shop.staffId)}
                />
              ))}
            </Box>
          </Box>
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
              <Avatar sx={{ width: 35, height: 35 }}></Avatar>
              <Typography>Ten khach hang</Typography>
            </Box>
            <Box
              padding={"1rem"}
              display={"flex"}
              gap={1}
              flexDirection={"column"}
              flex={1}
              justifyContent={"end"}
            >
              <Box
                bgcolor={"white"}
                width={"60%"}
                padding={"0.5rem"}
                borderRadius={"1rem"}
                boxShadow={"4px 4px 8px #e1e1e1"}
              >
                <Typography>Noi dung tin nhan gui di</Typography>
              </Box>
              <Box
                bgcolor={"#f89c5a"}
                width={"60%"}
                padding={"0.5rem"}
                borderRadius={"1rem"}
                boxShadow={"4px 4px 8px #e1e1e1"}
                alignSelf={"flex-end"}
              >
                <Typography>Noi dung tin nhan gui den</Typography>
              </Box>
            </Box>
            <Box
              bgcolor={"white"}
              padding={"0.5rem 1rem"}
              borderTop="1px solid #dbdbdb"
            >
              <Input
                fullWidth
                disableUnderline
                placeholder="Nhập nội dung tin nhắn"
                endAdornment={<Send sx={{ color: "#5cc407" }}></Send>}
              ></Input>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ChatList;
