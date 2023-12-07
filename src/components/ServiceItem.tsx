import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import type { FC } from "react";

interface ServiceItemProps {}

const ServiceItem: FC<ServiceItemProps> = () => {
  return (
    <Card variant="elevation" sx={{ bgcolor: "#F2F2F4", borderRadius: 4 }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://tropicpet.vn/wp-content/uploads/2021/05/dich-vu-kham-chua-benh-425x313.jpg"
        title="dich vu"
      />
      <CardHeader
        title="Khám chữa bệnh"
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
          Thực hiện tiếp nhận sàng lọc,khám chuyên khoa, xét nghiệm, chẩn đoán
          và điều trị bệnh cho thú cưng của bạn.
        </Typography>
      </CardContent>
      {/* <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ textTransform: "initial", fontSize: 16, color: "#ED6436" }}
        >
          Xem chi tiết
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default ServiceItem;
