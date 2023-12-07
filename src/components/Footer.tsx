import {
  FacebookOutlined,
  Instagram,
  Phone,
  Twitter,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import type { FC } from "react";
import logo from "../assets/img/logo.svg";

interface Footer {}

const Footer: FC<Footer> = () => {
  return (
    <Box
      display="flex"
      sx={{
        // position: "absolute",
        // bottom: 0,
        // right: 0,
        // left: 0,
        paddingBottom: "80px",
        marginTop: "80px",
      }}
    >
      <Box
        flex={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <img src={logo} width="45%" />
        <Box display="flex" gap={2}>
          <Instagram sx={{ color: "#F8612D", width: 45, height: 45 }} />
          <FacebookOutlined sx={{ color: "#F8612D", width: 45, height: 45 }} />
          <Twitter sx={{ color: "#F8612D", width: 45, height: 45 }} />
        </Box>
      </Box>
      <Box
        flex={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography
          sx={{
            color: "#F8612D",
            fontSize: 24,
            fontWeight: 600,
            paddingBottom: 2,
          }}
        >
          Dịch vụ của chúng tôi
        </Typography>
        <Typography sx={{ fontSize: 20 }}>Spa - Làm đẹp</Typography>
        <Typography sx={{ fontSize: 20 }}>Khám sức khỏe</Typography>
        <Typography sx={{ fontSize: 20 }}>Khách sạn thú cưng</Typography>
        <Typography sx={{ fontSize: 20 }}>Cẩm nang chăm sóc</Typography>
      </Box>
      <Box
        flex={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography
          sx={{
            color: "#F8612D",
            fontSize: 24,
            fontWeight: 600,
            paddingBottom: 2,
          }}
        >
          Thông tin liên hệ
        </Typography>
        <Box sx={{ marginBottom: "20px" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <EmailOutlinedIcon />
            <Typography fontSize={20}>
              Gmail: tamthanh283012@gmail.com
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <LocalPhoneOutlinedIcon />
            <Typography fontSize={20}>Hotline: 0366833283</Typography>
          </Box>
        </Box>
        <Box
          sx={{ border: "solid 2px #ED6436", borderRadius: "0 20px 20px 20px" }}
          display="flex"
          width="40%"
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

export default Footer;
