import { QuestionAnswer, WhatsApp } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, ChatList } from "../components";
import { listenSocket } from "../socket";

interface HomeLayout {}

const HomeLayout: FC<HomeLayout> = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const disconnect = listenSocket();
    setShow(true);
    return disconnect;
  }, []);
  return (
    <>
      <Header />
      <Box pt="80px">
        <Outlet />
      </Box>
      <Footer />
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
      {show && <ChatList />}
      <Fab
        sx={{
          position: "fixed",
          bottom: 20,
          right: 30,
          cursor: "pointer",
          zIndex: 0,
        }}
        variant="extended"
        size="medium"
        color="warning"
      >
        <WhatsApp sx={{ mr: "0.5rem" }} />
        Chatbot
      </Fab>
    </>
  );
};

export default HomeLayout;
