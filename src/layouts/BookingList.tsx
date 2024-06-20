import { DateRange, NavigateNext, RoomTwoTone } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { getListBooking } from "../api";
import Booking from "../components/Booking";

const Image = styled("img")({});

interface BookingListProps {}

const BookingList: FC<BookingListProps> = () => {
  const [age, setAge] = useState("");

  const handleChange = () => {};

  const { data: bookingList, refetch } = useQuery({
    queryKey: [],
    queryFn: () => getListBooking(),
    initialData: [],
  });

  return (
    <Box
      paddingTop={2}
      display={"flex"}
      flexDirection={"column"}
      alignItems="center"
    >
      {/* Link */}
      <Box
        paddingLeft={10}
        width={"100%"}
        display={"flex"}
        justifyContent={"start"}
      >
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ paddingTop: "10px" }}
        >
          <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/"
            //   onClick={handleClick}
          >
            Trang chủ
          </Link>
          <Typography key="3" color="text.primary">
            Lịch sử đặt dịch vụ
          </Typography>
        </Breadcrumbs>
      </Box>
      {/* Content */}
      <Box
        display={"flex"}
        width={"100%"}
        gap={8}
        sx={{ padding: "1rem 5rem" }}
      >
        {/* Filter */}
        <Box
          flex={3}
          sx={{
            bgcolor: "#f7f7f7",
            border: "1px solid #f3f3f3",
            borderRadius: "1rem",
          }}
          padding={"1rem"}
          display="flex"
          flexDirection="column"
          gap={2}
          maxHeight="37vh"
        >
          <Box display={"flex"} gap={2} flexDirection="column">
            <Typography fontWeight={600}>Dịch Vụ</Typography>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display={"flex"} gap={2} flexDirection="column">
            <Typography fontWeight={600}>Địa chỉ</Typography>
            <Box display="flex" gap={2}>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        {/* List booking */}
        <Box flex={9} display="flex" flexDirection="column" gap={4}>
          {bookingList &&
            bookingList.map((booking, index) => {
              return (
                <Booking
                  id={booking.id}
                  status={booking.status}
                  time={booking.time}
                  createdAt={booking.createdAt}
                  serviceShop={booking.shopService}
                  refetch={refetch}
                ></Booking>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default BookingList;
