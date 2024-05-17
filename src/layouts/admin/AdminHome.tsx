import { Box } from "@mui/material";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

interface AdminHomeProps {}

const AdminHome: FC<AdminHomeProps> = () => {
  return (
    <Box bgcolor="#F4F5FA" display="flex" minHeight="100vh">
      <Box flex={2}>
        <NavBar />
      </Box>
      <Box flex={9}>
        {/* <Header /> */}
        {/* {isConnected && <Outlet />} */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminHome;
