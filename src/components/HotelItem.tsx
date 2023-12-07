import { Box, Button, Typography } from "@mui/material";
import type { FC } from "react";
import bg from "../assets/img/image 17.png";
import icon from "../assets/img/icon.svg";

interface HotelItemProps {}

const HotelItem: FC<HotelItemProps> = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{ position: "absolute", top: 0, left: "50%", translate: "-50%" }}
      >
        <img src={icon} />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          border: "1px dotted #C5C5C5",
          marginTop: 6,
          padding: "60px 20px 16px 20px",
          backgroundImage: `url("${bg}")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600, marginBottom: 1 }}>
          Pet Hotel
        </Typography>
        <Typography textAlign="center">
          Dịch vụ chăm sóc tận tình ngay cả khi bạn không ở bên cạnh các bé thú
          cưng.
        </Typography>
        <Button
          sx={{
            width: "60%",
            textTransform: "initial",
            borderRadius: 12,
            border: "2px solid #ED6436",
            color: "#ED6436",
            marginTop: 2,
            ".Mui-focusVisible": { bgcolor: "red" },
          }}
        >
          <Typography sx={{ color: "black" }}>Xem chi tiết</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default HotelItem;
