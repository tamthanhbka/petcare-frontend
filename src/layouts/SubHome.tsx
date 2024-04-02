import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { type FC } from "react";
import { Form, useNavigate } from "react-router-dom";
import health from "../assets/img/health.svg";
import img1 from "../assets/img/home1.svg";
import hotel from "../assets/img/hotel.svg";
import iconPet from "../assets/img/iconpet.svg";
import spa from "../assets/img/spa.svg";
import { HealthItem, HotelItem, SpaItem } from "../components";
import useShopSearch from "../hook/useShopSearch";

interface SubHomeProps {}

const SubHome: FC<SubHomeProps> = () => {
  const navigate = useNavigate();
  const { setSearch, shops, search } = useShopSearch();
  return (
    <Box paddingTop="80px">
      {/* general introduction */}
      <Box display="flex">
        <Box flex={6} display="flex" alignItems="center" flexDirection="column">
          <Box
            width="80%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            paddingTop={15}
          >
            <Typography
              sx={{
                color: "#ED6436",
                fontSize: 45,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Thiên đường của thú cưng!
            </Typography>
            <Typography
              sx={{
                fontSize: 30,
                textAlign: "center",
                width: "90%",
                lineHeight: "2.5rem",
              }}
            >
              Chúng tôi cung cấp các dịch vụ tốt nhất dành cho thú cưng của bạn.
            </Typography>
          </Box>
          <Box
            marginTop={4}
            width="40%"
            display="flex"
            sx={{ border: "3px solid #ED6436", borderRadius: 12 }}
            justifyContent="space-between"
            alignItems="center"
          >
            <InputBase
              onChange={(v) => {
                setSearch(v.currentTarget.value);
              }}
              sx={{ marginLeft: 2 }}
              placeholder="Nhập để tìm kiếm..."
            />
            <IconButton
              type="button"
              sx={{ p: "10px", color: "#ED6436" }}
              aria-label="search"
              onClick={() => navigate(`search?q=${search}`)}
            >
              <Search
                sx={{ color: "#9f9f9f", "&:hover": { color: "#ED6436" } }}
              />
            </IconButton>
          </Box>
          <Box position="absolute" left={8} bottom={60}>
            <img src={iconPet} />
          </Box>
        </Box>
        <Box flex={6} display="flex" justifyContent="flex-end">
          <img src={img1} />
        </Box>
      </Box>
      {/* Top Spa */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        padding="40px 0"
      >
        <Box display="flex">
          <Box flex={6} display="flex">
            <img src={spa} />
          </Box>
          <Box flex={6}>
            <Box
              width="80%"
              display="flex"
              alignItems="center"
              flexDirection="column"
              paddingTop={15}
            >
              <Typography
                sx={{
                  color: "#7AC143",
                  fontSize: 45,
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: 2,
                }}
              >
                Boss đến là đẹp!
              </Typography>
              <Typography
                sx={{
                  fontSize: 30,
                  textAlign: "center",
                  width: "90%",
                  lineHeight: "2.5rem",
                }}
              >
                Chúng tôi cung cấp các dịch vụ tốt nhất dành cho thú cưng của
                bạn.
              </Typography>
              <Button
                sx={{
                  marginTop: 4,
                  width: "40%",
                  bgcolor: "#7AC143",
                  color: "white",
                  borderRadius: 16,
                  "&:hover": { bgcolor: "#7AC143" },
                  fontSize: 30,
                  textTransform: "initial",
                }}
              >
                Đặt lịch ngay
              </Button>
            </Box>
          </Box>
        </Box>
        <SpaItem />
      </Box>

      {/* Top kham sk */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="40px 0"
      >
        <Box display="flex">
          <Box flex={6}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              paddingTop={15}
            >
              <Typography
                sx={{
                  color: "#ED6436",
                  fontSize: 45,
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: 2,
                }}
              >
                Nơi chăm sóc thú cưng tốt nhất!
              </Typography>
              <Typography
                sx={{
                  fontSize: 30,
                  textAlign: "center",
                  width: "90%",
                  lineHeight: "2.5rem",
                }}
              >
                Chúng tôi cung cấp các dịch vụ tốt nhất dành cho thú cưng của
                bạn.
              </Typography>
              <Button
                sx={{
                  marginTop: 4,
                  width: "35%",
                  border: "3px solid #ED6436",
                  color: "#ED6436",
                  borderRadius: 16,

                  textTransform: "initial",
                }}
              >
                <Typography color="black" fontSize={30}>
                  Đặt lịch ngay
                </Typography>
              </Button>
            </Box>
          </Box>
          <Box flex={6} display="flex" justifyContent="flex-end">
            <img src={health} />
          </Box>
        </Box>
        <Box width="80%" display="flex" gap={4} paddingTop={4}>
          <HealthItem />
          <HealthItem />
          <HealthItem />
          <HealthItem />
        </Box>
      </Box>

      {/* Top khach san thu cung */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        padding="40px 0"
      >
        <Box display="flex">
          <Box flex={6} display="flex">
            <img src={hotel} />
          </Box>
          <Box flex={6}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              paddingTop={15}
            >
              <Typography
                sx={{
                  color: "#7AC143",
                  fontSize: 45,
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: 2,
                }}
              >
                Chạm dừng chân cho thú cưng!
              </Typography>
              <Typography
                sx={{
                  fontSize: 30,
                  textAlign: "center",
                  width: "90%",
                  lineHeight: "2.5rem",
                }}
              >
                Chúng tôi cung cấp các dịch vụ tốt nhất dành cho thú cưng của
                bạn.
              </Typography>
              <Button
                sx={{
                  marginTop: 4,
                  width: "35%",
                  border: "3px solid #7AC143",
                  color: "#7AC143",
                  borderRadius: 16,
                  textTransform: "initial",
                }}
              >
                <Typography color="black" fontSize={30}>
                  Đặt lịch ngay
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          // width="80%"
          display="flex"
          gap={4}
          padding="40px 10rem"
          alignItems="center"
        >
          <HotelItem />
          <HotelItem />
          <HotelItem />
        </Box>
      </Box>
    </Box>
  );
};

export default SubHome;
