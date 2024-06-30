import { Search } from "@mui/icons-material";
import { Box, OutlinedInput, Paper } from "@mui/material";
import { type FC } from "react";
import ChatItem from "../../components/chat/ChatItem";
import MessageBox from "../../components/chat/MessageBox";
import useStaffChat from "../../hook/useStaffChat";

interface ListMessageProps {}

const ListMessage: FC<ListMessageProps> = () => {
  const {
    chats,
    chatLoading,
    recentChats,
    selectedChat,
    selectChatUser,
    createChat,
  } = useStaffChat();

  console.log(recentChats);

  return (
    <Box padding={"2rem"}>
      <Paper elevation={2} sx={{ display: "flex", height: "90vh" }}>
        <Box flex={4} padding={"1rem"} borderRight="1px solid #dbdbdb">
          <OutlinedInput
            size="small"
            sx={{
              ".MuiOutlinedInput-root": { borderRadius: "10px" },
              mb: "1rem",
              display: "flex",
              alignSelf: "center",
            }}
            placeholder="Tìm kiếm"
            startAdornment={
              <Search sx={{ color: "#aaa", marginRight: "0.5rem" }}></Search>
            }
          ></OutlinedInput>
          <Box display="flex" flexDirection="column" gap={0.1}>
            {recentChats.map((chat) => (
              <ChatItem
                key={chat.id}
                name={chat.user.name}
                createdAt={chat.createdAt}
                lastMessage={chat.content}
                avatar={chat.user.avatar}
                onClick={() => selectChatUser(chat.userId)}
              />
            ))}
          </Box>
        </Box>
        {selectedChat && (
          <MessageBox
            isUser={false}
            info={selectedChat.user}
            loading={chatLoading}
            messages={chats}
            onSend={createChat}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ListMessage;
