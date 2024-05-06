import { MapsUgc, Notifications } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Auth";

interface HeaderStaffProps {}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const HeaderStaff: FC<HeaderStaffProps> = () => {
  const navigation = useNavigate();
  const { action } = useAuth();
  const [openSetting, setOpenSetting] = useState(false);
  const handleLogout = () => {
    action.logout();
  };
  const handleToggleSettings = () => {
    setOpenSetting((prv) => !prv);
  };
  return (
    <Box padding={"2rem 2rem 0 2rem"}>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          p: "0.7rem",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          sx={{ bgcolor: "#e6e6e6", "&:hover": { bgcolor: "#d6d6d6" } }}
          onClick={() => navigation(`/staff/chats`)}
        >
          <Badge
            badgeContent={4}
            sx={{ "& .MuiBadge-badge": { bgcolor: "#F7822A", color: "white" } }}
          >
            <MapsUgc sx={{ color: "#565656" }}></MapsUgc>
          </Badge>
        </IconButton>
        <IconButton
          sx={{ bgcolor: "#e6e6e6", "&:hover": { bgcolor: "#d6d6d6" } }}
        >
          <Badge
            badgeContent={4}
            sx={{ "& .MuiBadge-badge": { bgcolor: "#F7822A", color: "white" } }}
          >
            <Notifications sx={{ color: "#565656" }}></Notifications>
          </Badge>
        </IconButton>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          onClick={handleToggleSettings}
        >
          <Avatar />
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            // anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={openSetting}
          >
            {/* {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))} */}
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </StyledBadge>
      </Paper>
    </Box>
  );
};

export default HeaderStaff;
