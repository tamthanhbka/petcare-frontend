import { Phone, AccountCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Popper,
  Typography,
  styled,
} from "@mui/material";
import { useState, type FC } from "react";
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      <Box paddingRight={5} sx={{ cursor: "pointer" }}>
        <Avatar onClick={() => navigate("/history")} />
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
    </Box>
  );
};

export default Header;
