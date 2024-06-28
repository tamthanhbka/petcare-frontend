import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { TopShopType } from "../api/shop";

interface HealthProps extends TopShopType {}

const Health: FC<HealthProps> = (props) => {
  const { id, name, slogan, avatar } = props;
  const navigation = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "#F2F2F4",
        borderRadius: 5,
        padding: 4,
        width: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        height={130}
        component="img"
        image={
          avatar ??
          "https://tropicpet.vn/wp-content/uploads/2022/11/cua-hang-cham-soc-thu-cung-ha-noi.jpg"
        }
        sx={{ borderRadius: 4 }}
      ></CardMedia>
      <CardHeader
        title={name}
        sx={{
          textAlign: "center",
          ".MuiCardHeader-title": { fontWeight: 700 },
        }}
      />
      <CardContent sx={{ padding: 1 }}>
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          {slogan}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ textTransform: "initial", fontSize: 16, color: "#ED6436" }}
          onClick={() => navigation(`/shop/${id}`)}
        >
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
};

export default Health;
