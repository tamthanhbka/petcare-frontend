import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { StyledRating } from "../layouts/ShopDetail";
import { Pets, PetsOutlined } from "@mui/icons-material";

interface ServiceItemProps {
  id: number;
  name: string;
  description: string;
  image: string;
  lowestPrice: number;
  highestPrice: number;
  rating: number;
}

const ServiceItem: FC<ServiceItemProps> = (props) => {
  const { name, description, image, lowestPrice, highestPrice, rating } = props;
  return (
    <Card
      variant="elevation"
      elevation={0}
      sx={{
        bgcolor: "#f7fff2",
        borderRadius: 2,
        height: "290px",
        border: "1px solid #e1e1e1",
        "&:hover": { border: "1.5px solid #7AC143" },
        cursor: "auto",
        width: "324px",
      }}
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
          color: "#3b9c15",
        }}
      ></CardHeader>
      <CardContent sx={{ padding: "0 1rem 1rem 1.5rem" }}>
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
        <Typography
          sx={{
            mt: "0.5rem",
            fontWeight: 600,
          }}
        >
          {lowestPrice.toLocaleString("vi")} -{" "}
          {highestPrice.toLocaleString("vi")} VND
        </Typography>
        <StyledRating
          value={rating}
          sx={{ marginTop: 1 }}
          name="customized-color"
          defaultValue={2}
          readOnly
          precision={1}
          icon={<Pets fontSize="inherit" />}
          emptyIcon={<PetsOutlined fontSize="inherit" />}
        />
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
