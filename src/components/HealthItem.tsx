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

interface HealthProps {}

const Health: FC<HealthProps> = () => {
  const navigation = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#F2F2F4", borderRadius: 8, padding: 4 }}
    >
      <CardMedia
        component="img"
        image="https://tropicpet.vn/wp-content/uploads/2022/11/cua-hang-cham-soc-thu-cung-ha-noi.jpg"
        sx={{ borderRadius: 4 }}
      ></CardMedia>
      <CardHeader
        title="Tropicpet"
        sx={{
          textAlign: "center",
          ".MuiCardHeader-title": { fontWeight: 700 },
        }}
      ></CardHeader>
      <CardContent sx={{ padding: 1 }}>
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          Chẩn đoán chính xác tình trạng sức khỏe và đưa ra giải pháp an toàn
          cho thú cưng của bạn.
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ textTransform: "initial", fontSize: 16, color: "#ED6436" }}
          onClick={() => navigation("shop/1")}
        >
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
};

export default Health;
