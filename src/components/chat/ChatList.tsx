import { CloseOutlined, MarkUnreadChatAlt, Search } from "@mui/icons-material";
import { Box, Fab, OutlinedInput, Paper, Typography } from "@mui/material";
import { useState, type FC } from "react";
import useChat from "../../hook/useChat";
import ChatItem from "./ChatItem";
import MessageBox from "./MessageBox";

interface ListChatProps {}

const ChatList: FC<ListChatProps> = () => {
  const [show, setShow] = useState(false);
  const {
    chats,
    chatLoading,
    recentChats,
    selectedChat,
    selectChatShop,
    createChat,
  } = useChat({ onNewChat: () => setShow(true) });
  return (
    <>
      <Fab
        sx={{
          position: "fixed",
          bottom: 100,
          right: 20,
          cursor: "pointer",
          zIndex: 0,
          width: 65,
          height: 65,
        }}
        variant="circular"
        color="secondary"
        aria-label="add"
        size="medium"
        onClick={() => setShow(true)}
      >
        <MarkUnreadChatAlt />
      </Fab>
      <Paper
        elevation={2}
        sx={{
          width: "50%",
          border: "1px solid #cdcdcd",
          position: "fixed",
          top: 150,
          right: 10,
          bottom: 10,
          zIndex: 9999,
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
        <Box flex={1} height="90%" display="flex" borderTop="1px solid #dbdbdb">
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
            <Box
              display="flex"
              flexDirection="column"
              gap={0.1}
              height="100%"
              overflow="auto"
            >
              {recentChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  name={chat.shop.name}
                  createdAt={chat.createdAt}
                  lastMessage={chat.content}
                  avatar={chat.shop.avatar}
                  active={selectedChat?.shopId === chat.shopId}
                  onClick={() => selectChatShop(chat.shopId)}
                />
              ))}
            </Box>
          </Box>
          {selectedChat && (
            <MessageBox
              isUser={true}
              info={selectedChat.shop}
              loading={chatLoading}
              messages={chats}
              onSend={createChat}
            />
          )}
        </Box>
      </Paper>
    </>
  );
};

export default ChatList;
