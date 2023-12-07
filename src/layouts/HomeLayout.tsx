import type { FC } from "react";
import { Footer, Header } from "../components";
import { Box } from "@mui/material";
import chat from "../assets/img/chat.svg";
import { Outlet } from "react-router-dom";

interface HomeLayout {}

const HomeLayout: FC<HomeLayout> = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          position: "fixed",
          right: 120,
          bottom: 40,
          zIndex: 100,
          cursor: "pointer",
        }}
      >
        <img src={chat}></img>
      </Box>
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
