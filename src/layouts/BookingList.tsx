import { NavigateNext } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, type FC } from "react";
import { getListBooking } from "../api";
import { getDistricts, getProvinces } from "../api/address";
import Booking1 from "../components/Booking1";
import { ProvinceType, ServiceType } from "../type";

// const Image = styled("img")({});

interface BookingListProps {}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
//   // margin: "0.5rem",
//   // borderRadius: "10px",
//   "& label.Mui-focused": {
//     color: "#2E7D32",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "#B2BAC2",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#c7c7c7",
//     },
//     "&:hover fieldset": {
//       borderColor: "#2E7D32",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#617f62",
//     },
//   },
// });

const BookingList: FC<BookingListProps> = () => {
  const [service, setService] = useState<ServiceType>();
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const { data: provinces } = useQuery<ProvinceType[]>({
    queryKey: [`provinces`],
    queryFn: () => getProvinces(),
    refetchOnWindowFocus: false,
  });

  const { mutate: findDistricts, data: districts } = useMutation({
    mutationFn: (p: string) => getDistricts(p),
  });

  const { data: bookingList, refetch } = useQuery({
    queryKey: [],
    queryFn: () => getListBooking(),
    initialData: [],
  });

  useEffect(() => {
    if (provinces && province) {
      const result = provinces.find((p) => p.name === province);
      if (result) {
        findDistricts(result.code);
      }
    }
  }, [findDistricts, province, provinces]);

  const services = [
    ...new Map(
      bookingList.map((b) => [b.shopService.service.id, b.shopService.service])
    ).values(),
  ];

  const filterServiceBookings = bookingList.filter(
    (b) =>
      b.shopService.service.name
        .toLowerCase()
        .includes(service?.name.toLowerCase() || "") &&
      b.shopService.shop.address.province.includes(province || "") &&
      b.shopService.shop.address.province.includes(district || "")
  );

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
        gap={2}
        sx={{ padding: "1rem 5rem" }}
      >
        {/* Filter */}
        <Box
          flex={2}
          sx={{
            bgcolor: "#fcf5f0",
            border: "1px solid #c5af9b",
            borderRadius: "4px",
          }}
          padding={"1rem"}
          display="flex"
          flexDirection="column"
          gap={2}
          maxHeight="50vh"
        >
          <Box display={"flex"} gap={2} flexDirection="column">
            <Typography fontWeight={600} sx={{ color: "#e06b23" }}>
              Dịch Vụ
            </Typography>
            <FormControl>
              <InputLabel id="demo-multiple-name-label">Dịch vụ</InputLabel>
              <Select
                id="demo-multiple-name-label"
                value={service?.name}
                onChange={(e) =>
                  setService(services?.find((s) => s.name === e.target.value))
                }
                input={
                  <OutlinedInput
                    label="Dịch vụ"
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                }
                MenuProps={MenuProps}
              >
                {services &&
                  services.map((sv) => (
                    <MenuItem key={sv.id} value={sv.name}>
                      {sv.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box display={"flex"} gap={2} flexDirection="column">
            <Typography fontWeight={600} sx={{ color: "#e06b23" }}>
              Địa chỉ
            </Typography>
            <Box display="flex" gap={2} flexDirection="column">
              <FormControl>
                <InputLabel id="demo-multiple-name-label">
                  Thành phố/Tỉnh
                </InputLabel>
                <Select
                  id="demo-multiple-name-label"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  input={
                    <OutlinedInput
                      label="Thành phố/Tỉnh"
                      sx={{
                        borderRadius: "8px",
                      }}
                    />
                  }
                  MenuProps={MenuProps}
                >
                  {provinces &&
                    provinces.map((p) => (
                      <MenuItem key={p.code} value={p.name}>
                        {p.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-multiple-name-label">
                  Quận/Huyện
                </InputLabel>
                <Select
                  id="demo-multiple-name-label"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  input={
                    <OutlinedInput
                      label="Quận/Huyện"
                      sx={{
                        borderRadius: "8px",
                      }}
                    />
                  }
                  MenuProps={MenuProps}
                >
                  {districts &&
                    districts.map((d) => (
                      <MenuItem key={d.code} value={d.name}>
                        {d.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        {/* List booking */}
        <Box flex={10} display="grid" gap={3} gridTemplateColumns="auto">
          {filterServiceBookings.map((booking) => (
            <Booking1 key={booking.id} {...booking} refetch={refetch} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BookingList;
