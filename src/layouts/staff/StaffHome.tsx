import { Box } from "@mui/material";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./";

interface StaffHome {}

const StaffHome: FC<StaffHome> = () => {
  return (
    <Box bgcolor="#F4F5FA" display="flex" minHeight="100vh">
      <Box flex={2}>
        <NavBar />
      </Box>
      <Box flex={9}>
        {/* <Header /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default StaffHome;
