import { Phone, AccountCircle } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Fade,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Popper,
  Typography,
  styled,
} from "@mui/material";
import React, { useState, type FC } from "react";
import logo from "../assets/img/logo.svg";
import "../assets/css/header.css";
import { NavLink, useNavigate } from "react-router-dom";
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
  const [openPoper, setOpenPoper] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const anchorRef = React.useRef<HTMLElement>(null);
  const handleOpenPoper = () => {
    setOpenPoper(true);
  };
  const handleClosePoper = () => {
    setOpenPoper(false);
  };
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  return (
    <Box
      height={80}
      width="100%"
      display="flex"
      alignItems="center"
      position="fixed"
      bgcolor="#ffffff"
      boxShadow="0px 2px 2px 0 #eaeaea"
      zIndex={99}
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
      <Box flex={7} display="flex" gap={4}>
        <StyledNavLink to={"/"}>Trang chủ</StyledNavLink>
        <StyledNavLink to={"/spa"}>Spa - Làm đẹp</StyledNavLink>
        <StyledNavLink to={"/health"}>Khám sức khỏe</StyledNavLink>
        <StyledNavLink to={"/hotel"}>Khách sạn thú cưng</StyledNavLink>
        <StyledNavLink to={"/tips"}>Cẩm nang chăm sóc</StyledNavLink>
        {/* <Button
          disableRipple={true}
          sx={{
            textTransform: "initial",
            fontWeight: 550,
            fontSize: 16,
            height: "80px",
            borderRadius: "0",
            padding: 0,
            color: "black",
            borderBottom: "solid 4px #ED6436",
            "&:hover": {
              color: "#ED6436",
              borderBottom: "solid 4px #ED6436",
              bgcolor: "#fff",
            },
            disableRipple: "true",
            disableFocusRipple: "true",
          }}
        >
          Trang chủ
        </Button> */}
        {/* <Button
          disableRipple={true}
          sx={{
            textTransform: "initial",
            fontWeight: 550,
            fontSize: 16,
            height: "80px",
            borderRadius: "0",
            padding: 0,
            color: "black",
            borderBottom: "solid 4px #ffffff",
            "&:hover": {
              color: "#ED6436",
              borderBottom: "solid 4px #ED6436",
              bgcolor: "#fff",
            },
          }}
        >
          Spa - Làm đẹp
        </Button>
        <Button
          disableRipple={true}
          sx={{
            textTransform: "initial",
            fontWeight: 550,
            fontSize: 16,
            height: "80px",
            borderRadius: "0",
            padding: 0,
            color: "black",
            borderBottom: "solid 4px #ffffff",
            "&:hover": {
              color: "#ED6436",
              borderBottom: "solid 4px #ED6436",
              bgcolor: "#fff",
            },
          }}
        >
          Khám sức khỏe
        </Button>
        <Button
          disableRipple={true}
          sx={{
            textTransform: "initial",
            fontWeight: 550,
            fontSize: 16,
            height: "80px",
            borderRadius: "0",
            padding: 0,
            color: "black",
            borderBottom: "solid 4px #ffffff",
            "&:hover": {
              color: "#ED6436",
              borderBottom: "solid 4px #ED6436",
              bgcolor: "#fff",
            },
          }}
        >
          Khách sạn thú cưng
        </Button>
        <Button
          disableRipple={true}
          sx={{
            textTransform: "initial",
            fontWeight: 550,
            fontSize: 16,
            height: "80px",
            borderRadius: "0",
            padding: 0,
            color: "black",
            borderBottom: "solid 4px #ffffff",
            "&:hover": {
              color: "#ED6436",
              borderBottom: "solid 4px #ED6436",
              bgcolor: "#fff",
            },
          }}
        >
          Cẩm nang chăm sóc
        </Button> */}
      </Box>
      {/* Phone button */}
      <Box flex={2} sx={{ cursor: "pointer" }}>
        <Box
          sx={{ border: "solid 2px #ED6436", borderRadius: "0 20px 20px 20px" }}
          display="flex"
          width="90%"
          justifyContent="space-between"
          alignItems="center"
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
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar onClick={handleOpenPoper} />
        </StyledBadge>
      </Box>
      {/* login button */}
      {/* <Box paddingRight={5} sx={{ cursor: "pointer" }}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Đăng nhập</MenuItem>
        <MenuItem onClick={handleClose}>Đăng ký</MenuItem>
      </Menu> */}

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
                  <MenuItem onClick={handleClosePoper}>
                    Lịch sử đặt dịch vụ
                  </MenuItem>
                  <MenuItem onClick={() => navigate("message")}>
                    Tin nhắn
                  </MenuItem>
                  <MenuItem onClick={handleClosePoper}>
                    Thông tin cá nhân
                  </MenuItem>
                  <MenuItem onClick={handleClosePoper}>Đăng xuất</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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
