import { Phone } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  styled,
} from "@mui/material";
import React, { useState, type FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/header.css";
import logo from "../assets/img/logo.svg";
import { useAuth } from "./Auth";
import RequestFrom from "./RequestForm";
const StyledNavLink = styled(NavLink)({
  textDecoration: "none",
  textTransform: "initial",
  fontWeight: 550,
  fontSize: 16,
  height: "80px",
  borderRadius: "0",
  padding: 0,
  color: "black",
  "&.active": { borderBottom: "solid 4px #ED6436" },
  "&:hover": {
    color: "#ED6436",
    borderBottom: "solid 4px #ED6436",
    bgcolor: "#fff",
  },
  lineHeight: "75px",
  fontFamily: "sans-serif",
});
interface Header {}

const Header: FC<Header> = () => {
  const navigate = useNavigate();
  const { action, user } = useAuth();
  const [openPoper, setOpenPoper] = useState(false);
  // const [openLogin, setOpenLogin] = useState(false);
  const [openRequestForm, setOpenRequestForm] = useState(false);
  const anchorRef = React.useRef<HTMLElement>(null);
  const handleLogout = () => {
    action.logout();
  };
  const handleOpenPoper = () => {
    setOpenPoper(true);
  };
  const handleClosePoper = () => {
    setOpenPoper(false);
  };
  // const handleOpenLogin = () => {
  //   setOpenLogin(true);
  // };
  // const handleCloseLogin = () => {
  //   setOpenLogin(false);
  // };

  const handleOpenRequestForm = () => setOpenRequestForm(true);
  const handleCloseRequestForm = () => setOpenRequestForm(false);
  return (
    <Box
      height={80}
      width="100%"
      display="flex"
      alignItems="center"
      position="fixed"
      bgcolor="#ffffff"
      boxShadow="0px 2px 2px 0 #eaeaea"
      zIndex={90}
    >
      {/* Logo  */}
      <Box
        flex={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <img height="80px" alt="Petcare" src={logo}></img>
      </Box>
      {/* Navigation */}
      <Box
        flex={10}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
        gap={8}
      >
        <StyledNavLink to={"/"}>Trang chủ</StyledNavLink>
        <StyledNavLink to={"/spa"}>Spa - Làm đẹp</StyledNavLink>
        <StyledNavLink to={"/health"}>Khám sức khỏe</StyledNavLink>
        <StyledNavLink to={"/hotel"}>Khách sạn thú cưng</StyledNavLink>
      </Box>
      {/* Phone button */}
      <Box flex={3} sx={{ cursor: "pointer" }} maxWidth={"250px"}>
        <Box
          sx={{ border: "solid 2px #ED6436", borderRadius: "0 20px 20px 20px" }}
          display={user?.role == "user" ? "flex" : "none"}
          width="90%"
          justifyContent="space-between"
          alignItems="center"
          onClick={handleOpenRequestForm}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              height: "32px",
              width: "30px",
              bgcolor: "#ED6436",
              borderRadius: "0 0 0 12px",
            }}
          >
            <Phone sx={{ color: "white" }}></Phone>
          </Box>
          <Typography sx={{ margin: "4px 12px 4px 0" }}>
            Hợp tác với chúng tôi
          </Typography>
        </Box>
      </Box>
      {/* avatar */}
      <Box ref={anchorRef} paddingRight={5} sx={{ cursor: "pointer" }}>
        {user ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar src={user.avatar} onClick={handleOpenPoper}>
              {user.avatar ? null : user.fullName.at(0)?.toUpperCase()}
            </Avatar>
          </StyledBadge>
        ) : (
          <Box display="flex" gap={0.5}>
            <Button
              onClick={() => navigate("login")}
              sx={{
                bgcolor: "#ED6436",
                color: "white",
                borderRadius: "1rem",
                textTransform: "initial",
                padding: "4px 12px",
                "&:hover": {
                  bgcolor: "#e25f34",
                  color: "white",
                },
              }}
            >
              Đăng nhập
            </Button>
            <Button
              onClick={() => navigate("register")}
              sx={{
                bgcolor: "#ffffff",
                color: "black",
                border: "2px solid #ED6436",
                borderRadius: "1rem",
                textTransform: "initial",
                padding: "4px 12px",
                "&:hover": {
                  bgcolor: "#ED6436",
                  color: "white",
                },
              }}
            >
              Đăng ký
            </Button>
          </Box>
        )}
        {/* <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar />
        </StyledBadge> */}
      </Box>

      {/* Poper */}
      <Popper
        open={openPoper}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper elevation={8}>
              <ClickAwayListener onClickAway={handleClosePoper}>
                <MenuList
                  // autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem
                    disabled={user?.role == "user" ? false : true}
                    onClick={() => {
                      setOpenPoper(false);
                      navigate("history");
                    }}
                  >
                    Lịch sử đặt dịch vụ
                  </MenuItem>
                  {/* <MenuItem onClick={handleClosePoper}>
                    Thông tin cá nhân
                  </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      setOpenPoper(false);
                      handleLogout();
                    }}
                  >
                    Đăng xuất
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <RequestFrom
        open={openRequestForm}
        handleClose={handleCloseRequestForm}
      />
    </Box>
  );
};

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
export default Header;
