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

interface SearchItemProps {
  id: number;
  name: string;
  hotline?: string;
  avatar: string;
  slogan: string;
  staffId?: number;
}

const SearchItem: FC<SearchItemProps> = (props: SearchItemProps) => {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#F2F2F4", borderRadius: 8, padding: 4 }}
    >
      <CardMedia
        component="img"
        image={
          props.avatar
            ? props.avatar
            : "https://freelancervietnam.vn/wp-content/uploads/2020/07/post-thumb-dich-vu-cham-soc.jpg"
        }
        sx={{
          borderRadius: 4,
          height: "140px",
        }}
      ></CardMedia>
      <CardHeader
        title={props.name}
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
          {props.slogan}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
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
          onClick={() => navigate(`/shop/${props.id}`)}
        >
          <Typography sx={{ color: "black" }}>Xem chi tiết</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default SearchItem;
