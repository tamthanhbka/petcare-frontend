import { Phone } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import type { FC } from "react";
import logo from "../assets/img/logo.svg";
import "../assets/css/header.css";
interface Header {}

const Header: FC<Header> = () => {
  return (
    <Box
      height={80}
      width="100%"
      display="flex"
      alignItems="center"
      position="fixed"
      bgcolor="white"
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
      >
        <img height="80px" alt="Petcare" src={logo}></img>
      </Box>
      {/* Navigation */}
      <Box flex={7} display="flex" gap={4}>
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
        </Button>
      </Box>
      {/* Phone button */}
      <Box flex={2} sx={{ cursor: "pointer" }}>
        <Box
          sx={{ border: "solid 2px #ED6436", borderRadius: "0 20px 20px 20px" }}
          display="flex"
          width="80%"
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
    </Box>
  );
};

export default Header;
