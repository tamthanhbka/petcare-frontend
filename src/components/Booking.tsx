import { DateRange, RoomTwoTone } from "@mui/icons-material";
import { Box, Button, Chip, Paper, Typography, styled } from "@mui/material";
import type { FC } from "react";
import { ServiceShopType } from "../type";
import { useNavigate } from "react-router-dom";
import { AxiosError, cancelBooking } from "../api";
import { toast } from "react-toastify";

const Image = styled("img")({});

const PendingChip = styled(Chip)({
  color: "#06BB8A",
});

interface BookingProps {
  id: number;
  status: string;
  time: string;
  createdAt: string;
  serviceShop: ServiceShopType;
  refetch: () => {};
}

const Booking: FC<BookingProps> = (props) => {
  const navigate = useNavigate();
  const { id, status, time, createdAt, serviceShop, refetch } = props;
  const { province, district, ward, detail } = serviceShop.shop.address;

  const handleCancelButton = (bookingId: number, refetch: () => {}) => {
    try {
      cancelBooking(bookingId).then(() => refetch());
      toast.success("Hủy lịch hẹn thành công!");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message);
      console.log(err.response);
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        gap: 3,
      }}
      elevation={3}
    >
      <Box flex={"3"} height={"100%"} display={"flex"} padding={"1rem"}>
        <Box overflow={"hidden"} borderRadius={"1rem"}>
          <Image
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "1rem",
              transition: "all .3s",
              "&:hover": {
                transform: "scale(1.2)",
                transition: "all .5s",
              },
            }}
            src={
              serviceShop.image
                ? serviceShop.image
                : "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/11/dich-vu-cham-soc-thu-cung-tai-nha-1.jpg"
            }
          />
        </Box>
      </Box>
      <Box
        flex={"5"}
        display={"flex"}
        flexDirection={"column"}
        padding={"1.5rem"}
        justifyContent={"center"}
        gap={0.5}
      >
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Typography fontStyle="italic" fontSize={14} color={"#a4a4a4"}>
            {new Date(createdAt).toLocaleDateString("vi-VN")}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Chip label={status} sx={{ color: "#616362" }}></Chip>
          <Typography>
            {serviceShop.lowestPrice} - {serviceShop.highestPrice} VND
          </Typography>
        </Box>
        <Typography fontWeight={600} fontSize={"22px"}>
          {serviceShop.service.name}
        </Typography>
        <Typography
          onClick={() => navigate(`/shop/${serviceShop.shop.id}`)}
          fontSize={"18px"}
        >
          {serviceShop.shop.name}
        </Typography>
        <Typography
          lineHeight={"1rem"}
          color={"#9b9a9a"}
          display={"flex"}
          alignItems={"center"}
        >
          <RoomTwoTone sx={{ color: "#06a0bb" }}></RoomTwoTone>
          {detail},{ward},{district},{province}
        </Typography>
        <Typography color={"#9b9a9a"} display={"flex"} alignItems={"center"}>
          <DateRange sx={{ color: "#f6e11f" }}></DateRange>
          {new Date(time).toLocaleDateString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button
            disabled={status == "pending" ? false : true}
            variant="contained"
            color="warning"
            sx={{
              textTransform: "inherit",
            }}
            onClick={() => handleCancelButton(id, refetch)}
          >
            Hủy dịch vụ
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Booking;
