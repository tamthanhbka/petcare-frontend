import { Box } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../components/Auth";
import { listenSocket } from "../../socket";
import { NavBar } from "./";

interface StaffHome {}

const StaffHome: FC<StaffHome> = () => {
  const { login } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const rasa = document.getElementById("rasa-chat-widget-container");
    if (!rasa) return;
    rasa.style.display = "none";
    return () => {
      rasa.style.display = "block";
    };
  }, []);
  useEffect(() => {
    if (!login) return;
    const disconnect = listenSocket(() => setIsConnected(true));
    return disconnect;
  }, [login]);
  return (
    <Box bgcolor="#F4F5FA" display="flex" minHeight="100vh">
      <Box flex={2}>
        <NavBar />
      </Box>
      <Box flex={9}>
        {/* <Header /> */}
        {isConnected && <Outlet />}
      </Box>
    </Box>
  );
};

export default StaffHome;
