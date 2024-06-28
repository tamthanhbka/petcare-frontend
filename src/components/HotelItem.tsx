import { Box, Button, Typography } from "@mui/material";
import type { FC } from "react";
import bg from "../assets/img/image 17.png";
import icon from "../assets/img/icon.svg";
import { TopShopType } from "../api/shop";
import { useNavigate } from "react-router-dom";

interface HotelItemProps extends TopShopType {}

const HotelItem: FC<HotelItemProps> = (props) => {
  const { id, name, slogan } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/shop/${id}`);
  };
  return (
    <Box sx={{ position: "relative", width: 350, height: "90%" }}>
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
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600, marginBottom: 1 }}>
          {name}
        </Typography>
        <Typography textAlign="center" sx={{ flex: 1 }}>
          {slogan}
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
          onClick={handleClick}
        >
          <Typography sx={{ color: "black" }}>Xem chi tiết</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default HotelItem;
