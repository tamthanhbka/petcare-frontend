import {
  DateRange,
  RoomTwoTone,
  LocalAtm,
  DeleteOutline,
} from "@mui/icons-material";
import { Box, Button, Chip, Paper, Typography, styled } from "@mui/material";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError, cancelBooking } from "../api";
import { BookingType } from "../type";
import ServiceRatingDialog from "./ServiceRatingDialog";

const Image = styled("img")({});

const PendingChip = styled(Chip)({
  color: "#06BB8A",
});

interface BookingProps extends BookingType {
  refetch: () => void;
}

const Booking1: FC<BookingProps> = (props) => {
  const { id, status, time, createdAt, shopService, refetch } = props;
  const { province, district, ward, detail } = shopService.shop.address;
  const [openRating, setOpenRating] = useState(false);
  const navigate = useNavigate();
  const handleCancelButton = async () => {
    try {
      await cancelBooking(id);
      refetch();
      toast.success("Hủy lịch hẹn thành công!");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message);
      console.log(err.response);
    }
  };
  const handleOpenRating = (open?: boolean) => () => setOpenRating(!!open);
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: ".8rem",
        gap: 2,
        height: "200px",
      }}
      elevation={3}
    >
      <Box overflow={"hidden"} borderRadius={"1rem"} position="relative">
        <Box
          sx={{
            position: "absolute",
            right: -55,
            top: -5,
            zIndex: 10,
            height: "50px",
            width: "150px",
            display: "grid",
            placeItems: "center",
            bgcolor:
              status === "pending"
                ? "#ffbb3b"
                : status === "completed"
                ? "#45de45"
                : "#ff7171",
            pt: 3,
            transform: "rotate(45deg)",
            fontWeight: "600",
            fontSize: 14,
            color: "white",
          }}
          children={
            status === "pending"
              ? "Đang chờ"
              : status === "completed"
              ? "Hoàn thành"
              : "Đã hủy"
          }
        />
        <Image
          sx={{
            width: "100%",
            height: "100%",
            transition: "all .3s",
            "&:hover": {
              transform: "scale(1.2)",
              transition: "all .5s",
            },
          }}
          src={
            shopService.image
              ? shopService.image
              : "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/11/dich-vu-cham-soc-thu-cung-tai-nha-1.jpg"
          }
        />
      </Box>
      <Box flex={1} display="flex" flexDirection={"column"}>
        <Typography fontWeight={600} fontSize={20}>
          {shopService.service.name}
        </Typography>
        <Typography
          onClick={() => navigate(`/shop/${shopService.shop.id}`)}
          fontSize={16}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {shopService.shop.name}
        </Typography>
        <Box display="flex">
          <LocalAtm sx={{ color: "#ffcc00", fontSize: 20 }} />
          <Typography>
            {shopService.lowestPrice.toLocaleString("vi")} -{" "}
            {shopService.highestPrice.toLocaleString("vi")} VND
          </Typography>
        </Box>
        <Typography color={"#9b9a9a"} display={"flex"} alignItems="start">
          <DateRange sx={{ color: "#f6e11f", fontSize: 20 }}></DateRange>
          {new Date(time).toLocaleDateString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        <Box
          lineHeight={"1rem"}
          fontSize={13}
          color={"#9b9a9a"}
          display={"flex"}
          alignItems={"start"}
        >
          <RoomTwoTone sx={{ color: "#06a0bb", fontSize: 20 }}></RoomTwoTone>
          <Typography>
            {detail},{ward},{district},{province}
          </Typography>
        </Box>
        <Box
          flex={1}
          display={"flex"}
          alignItems={"end"}
          justifyContent="space-between"
        >
          <Typography fontStyle="italic" fontSize={14} color={"#a4a4a4"}>
            {new Date(createdAt).toLocaleDateString("vi-VN")}
          </Typography>
          {status === "pending" ? (
            <Button
              startIcon={<DeleteOutline />}
              variant="outlined"
              color="error"
              sx={{
                textTransform: "inherit",
              }}
              onClick={handleCancelButton}
            >
              Hủy dịch vụ
            </Button>
          ) : status === "cancel" ? (
            <Button
              disabled
              variant="contained"
              color="warning"
              sx={{
                textTransform: "inherit",
              }}
            >
              Đã hủy
            </Button>
          ) : (
            <Button
              variant="contained"
              color="warning"
              sx={{
                textTransform: "inherit",
              }}
              onClick={handleOpenRating(true)}
            >
              Đánh giá
            </Button>
          )}
        </Box>
      </Box>
      <ServiceRatingDialog
        open={openRating}
        shopService={shopService}
        onClose={handleOpenRating(false)}
      />
    </Paper>
  );
};

export default Booking1;
