import { Business, MedicalServices, Pets, Phone } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ShopType } from "../type";
interface SearchItemProps extends ShopType {}

const SearchItem: FC<SearchItemProps> = (props: SearchItemProps) => {
  const { id, address, avatar, hotline, name, rating, services, slogan } =
    props;
  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ bgcolor: "#ffffff", borderRadius: 3 }}>
      <Box position="relative">
        <CardMedia
          component="img"
          image={
            avatar ??
            "https://freelancervietnam.vn/wp-content/uploads/2020/07/post-thumb-dich-vu-cham-soc.jpg"
          }
          sx={{
            height: "250px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            color: "white",
            bgcolor: "#0000005a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            transition: "all .1s linear",
            textShadow: ".1px .1px .2px black",
            ":hover": {
              cursor: "pointer",
              bgcolor: "#00000075",
              pb: 3,
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              width: "100%",
              whiteSpace: "wrap",
            }}
          >
            {slogan}
          </Typography>
        </Box>
        <Box display="flex" position="absolute" bottom={5} right={10} gap={0.2}>
          <Typography sx={{ color: "white", fontWeight: "500" }}>
            {+(rating || 0).toFixed(2)}
          </Typography>
          <Pets fontSize="small" sx={{ color: "#FFB400" }} />
        </Box>
      </Box>
      <Box
        display="flex"
        mt={1}
        flexDirection="column"
        alignItems="stretch"
        padding={1}
      >
        <Box display="flex" gap={1}>
          <Phone fontSize="small" sx={{ color: "#FFB400" }} />
          <Typography>{hotline}</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Business fontSize="small" sx={{ color: "#FFB400" }} />
          <Typography
            sx={{
              fontSize: 15,
              whiteSpace: "nowrap",
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {address.detail}
          </Typography>
        </Box>
        <Box display="flex" gap={1} title="Các dịch vụ">
          <MedicalServices fontSize="small" sx={{ color: "#FFB400" }} />
          <Typography
            sx={{
              fontSize: 15,
              whiteSpace: "nowrap",
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            title={services.map((s) => s.service.name).join(", ")}
          >
            {services.map((s) => s.service.name).join(", ")}
          </Typography>
        </Box>
      </Box>
      <CardActions sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
        <Button
          sx={{
            width: "60%",
            textTransform: "initial",
            borderRadius: 10,
            border: "2px solid #ED6436",
            color: "#ED6436",
            marginTop: 2,
            ".Mui-focusVisible": { bgcolor: "red" },
          }}
          onClick={() => navigate(`/shop/${id}`)}
        >
          <Typography sx={{ color: "black" }}>Xem chi tiết</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default SearchItem;
