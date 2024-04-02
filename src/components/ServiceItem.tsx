import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import type { FC } from "react";

interface ServiceItemProps {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ServiceItem: FC<ServiceItemProps> = (props) => {
  const { id, name, description, image } = props;
  console.table(props);

  return (
    <Card
      variant="elevation"
      elevation={5}
      sx={{ bgcolor: "#F2F2F4", borderRadius: 2 }}
    >
      <Box overflow={"hidden"}>
        <CardMedia
          image={
            image ??
            "https://thuythithi.com/wp-content/uploads/2020/05/3-tieu-chi-danh-gia-chat-luong-dich-vu-cham-soc-thu-cung-tai-nha.jpg"
          }
          title={name}
          sx={{
            height: "100px",
            transition: "all .3s",
            "&:hover": {
              transform: "scale(1.2)",
              transition: "all .5s",
            },
          }}
        />
      </Box>

      <CardHeader
        title={name}
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
          {description}
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
