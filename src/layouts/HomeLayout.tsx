import { Box } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { Outlet } from "react-router-dom";
import { ChatList, Footer, Header } from "../components";
import { useAuth } from "../components/Auth";
import { listenSocket } from "../socket";

interface HomeLayout {}

const HomeLayout: FC<HomeLayout> = () => {
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  useEffect(() => {
    if (!login) return;
    const disconnect = listenSocket(() => setShow(true));
    return () => {
      disconnect();
      setShow(false);
    };
  }, [login]);
  return (
    <>
      <Header />
      <Box pt="80px">
        <Outlet />
      </Box>
      <Footer />
      {show && <ChatList />}
    </>
  );
};

export default HomeLayout;
