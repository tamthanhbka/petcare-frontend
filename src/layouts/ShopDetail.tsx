import {
  ArrowBackIosNewOutlined,
  ArrowForwardIos,
  Pets,
  PetsOutlined,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Rating,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  DateTimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "@trendyol-js/react-carousel";
import { Dayjs } from "dayjs";
import { useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError, getShopInfo, sendRequestBooking } from "../api";
import commentApi from "../api/comment";
import "../assets/css/shopDetail.css";
import { CommentItem, ServiceItem } from "../components";
import { useAuth } from "../components/Auth";
import { startChatByUSer } from "../socket";
import { ShopType } from "../type";

interface ShopDetailProps {}
export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#82C55B",
  },
  "& .MuiRating-iconHover": {
    color: "#7bbe54",
  },
});

const ShopDetail: FC<ShopDetailProps> = () => {
  const { id } = useParams() as { id: string };
  const { login } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState<string>();
  const [dayBooking, setDayBooking] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState(false);

  const { data: shop } = useQuery<ShopType>({
    queryKey: [`shop${id}`],
    queryFn: () => getShopInfo(id),
    refetchOnWindowFocus: false,
  });

  const { data: comments } = useQuery({
    queryFn: () => commentApi.getAllByShop(+id),
    queryKey: ["allComments", id],
    refetchOnWindowFocus: false,
  });

  const handleOpenChat = () => {
    if (shop) startChatByUSer(shop.id);
  };
  const handleOpen = () => {
    if (login) return setOpen(true);
    navigate("/login?required=true");
  };
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent) => {
    setService(event.target.value);
  };

  const handleSubmitBooking = async () => {
    if (service && dayBooking) {
      if (dayBooking.hour() < 7 || dayBooking.hour() > 18) {
        toast.error(
          "Vui lòng chọn thời gian đặt lịch nằm trong khung giờ làm việc của chúng tôi!(7:00 - 18:00)"
        );
        // setOpen(false);
        return;
      }
      try {
        await sendRequestBooking(+service, dayBooking);
        toast.success("Gửi yêu cầu đặt lịch thành công!", {});
        setOpen(false);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message);
        console.log(err.response);
        setOpen(false);
      }
      return;
    }
    toast.error("Hãy chọn dịch vụ và ngày hẹn!");
    // setOpen(false);
  };
  return (
    <Box>
      <Box display="flex">
        <Box flex={6} display="flex" justifyContent="center">
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
              {shop?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: 30,
                textAlign: "center",
                width: "90%",
                lineHeight: "2.5rem",
              }}
            >
              {shop?.slogan}
            </Typography>
            <Button
              onClick={handleOpenChat}
              sx={{
                marginTop: 4,
                width: "40%",
                border: "3px solid #ED6436",
                color: "#ED6436",
                borderRadius: 16,

                textTransform: "initial",
              }}
            >
              <Typography fontSize={26} color="black">
                Chat với bác sĩ
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box flex={6}>
          <Box
            sx={{
              WebkitMaskImage: `url(
                "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTg5IDEwMDAuMDQiPjx0aXRsZT5fPC90aXRsZT48cGF0aCBkPSJNOTYxLjI0LDBDOTA0LjY0LDE1My44OCw4MjYuOCwyNjAsNjU4LjQ4LDE5Mi4zYy0xODYuNTYtNzUtMjk0LjgtNzQuNzctMzYwLDM3LjY1LTc5LjI1LDEzNi42MS04Ny43MiwxMzIuMS0xODcuNTYsMTk0LjcxLTE5MC43MywxMTkuNjEtMTI2LjQ3LDQzOC40OSwxMjQsNDM5Ljg4LDE0MS4wOS43OCwzOTcuMzEtMzYuMjksNTgzLjYsMzEsMTg1LjYxLDY3LDI1NC41MSwxMDIsMzcwLjUxLDEwNC41NVYwWiIvPjwvc3ZnPg=="
              )`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "right",
            }}
          >
            <img
              width="100%"
              src="https://pawsitive.bold-themes.com/buddy/wp-content/uploads/sites/2/2019/07/hero_image_10.png"
            />
          </Box>
        </Box>
      </Box>
      {/* Danh sach dich vu */}
      <Box display="flex" flexDirection="column" paddingBottom={8}>
        <Box display="flex">
          <Box flex={6}>
            <Box
              sx={{
                WebkitMaskImage: `url(
                  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMTk2LjkzIDEwNDYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDExOTYuOTMgMTA0NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZD0iTTAsNDIuMzJDMTAwLjItMjMuMzYsMjU4Ljk5LTkuNDcsMzI2LjU2LDYyLjQ2Yzc5LjgyLDg0Ljk3LDE1NCwxNDQuMzcsMjM1LjEyLDEzNC43NQ0KCWMxNzUuMTItMjAuNzgsMzE1LjIzLTUwLjQyLDM4Mi4wOCw5OC4wNWM0MC4wNCw4OC45NCw1OC45MiwxMzQuNTgsMTYxLjA0LDE4Ny45NGMxNTIuNjIsNzkuNzUsMTE0LjM1LDM2Ny4zNS0xMDUuMjksMzY4LjU3DQoJYy0xMjMuNzMsMC42OS0yOTkuMjEtMi42Ni00NjIuNTcsNTYuM2MtMjAyLjcsNzMuMTctMjkyLjQzLDE1MC44Mi00NTUuMTIsMTM2LjEyYy0zMi40NS0yLjkzLTU5LjctMTUuNjUtODEuODEtMzEuNjdMMCw0Mi4zMnoiLz4NCjwvc3ZnPg0K"
                )`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "left",
              }}
            >
              <img
                width="100%"
                src="https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/aobjahw/2021_11_30/IMG_5238.jpg.webp"
              />
            </Box>
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
                Dịch vụ chúng tôi cung cấp
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
                onClick={handleOpen}
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={8}
          padding="2rem 8rem"
        >
          {shop && (
            <Carousel
              useArrowKeys={true}
              dynamic={true}
              className="slider"
              show={3.5}
              slide={1}
              transition={0.3}
              swiping={true}
              leftArrow={
                <IconButton
                  sx={{
                    color: "#7AC143",
                    "&:hover": { bgcolor: "#7AC143", color: "white" },
                  }}
                >
                  <ArrowBackIosNewOutlined />
                </IconButton>
              }
              rightArrow={
                <IconButton
                  sx={{
                    color: "#7AC143",
                    "&:hover": { bgcolor: "#7AC143", color: "white" },
                    ml: "0.7rem",
                  }}
                >
                  <ArrowForwardIos />
                </IconButton>
              }
              children={shop.services.map((s) => {
                return (
                  <ServiceItem
                    key={s.id}
                    id={s.id}
                    name={s.service.name}
                    description={s.description}
                    image={s.image}
                  />
                );
              })}
            ></Carousel>
          )}
        </Box>
      </Box>

      {/* Nhan xet cua khach hang */}
      <Box height={500} alignItems="center" display="flex">
        <Box width={800}>
          {comments && (
            <Carousel
              className="slider"
              show={1}
              slide={1}
              transition={0.5}
              swiping={true}
              leftArrow={
                <IconButton>
                  <ArrowBackIosNewOutlined />
                </IconButton>
              }
              rightArrow={
                <IconButton>
                  <ArrowForwardIos />
                </IconButton>
              }
            >
              {comments.map((c) => (
                <CommentItem key={c.id} {...c} />
              ))}
            </Carousel>
          )}
        </Box>
        <Box
          sx={{
            backgroundImage:
              "url(https://pawsitive.bold-themes.com/buddy/wp-content/uploads/sites/2/2019/08/dog_services.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            display: "grid",
            placeItems: "center",
            alignSelf: "stretch",
            flex: 1,
          }}
        >
          <Typography
            width={400}
            fontSize={45}
            fontWeight={600}
            color="#fcfcfc"
          >
            Khách hàng nói gì về chúng tôi
          </Typography>
        </Box>
      </Box>
      {/* Them nhan xet */}
      <Box height={500} alignItems="center" display="flex">
        <Box
          sx={{
            position: "relative",
            backgroundImage:
              "url(https://pawsitive.bold-themes.com/buddy/wp-content/uploads/sites/2/2019/08/inner_services_cat.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            display: "grid",
            placeItems: "center",
            alignSelf: "stretch",
            flex: 1,
          }}
        >
          <Typography
            width={200}
            fontSize={45}
            fontWeight={600}
            color="#ffffff"
            position="absolute"
            left="5%"
            top="35%"
          >
            Đánh giá dịch vụ
          </Typography>
        </Box>
        <Box
          width="60%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          gap={2}
          padding={20}
        >
          <Typography fontSize={20}>
            "Mọi ý kiến của khách hàng luôn được chúng tôi ghi nhận và trân
            trọng để từ đó ngày càng hoàn thiện hơn."
          </Typography>
          <Typography sx={{ alignSelf: "start" }} fontSize={18}>
            Hãy để lại đánh giá của bạn
          </Typography>
          <StyledRating
            sx={{ alignSelf: "start" }}
            name="customized-color"
            defaultValue={5}
            precision={1}
            icon={<Pets fontSize="inherit" />}
            emptyIcon={<PetsOutlined fontSize="inherit" />}
          />
          <TextField
            rows={3}
            multiline
            label="Đánh giá của bạn"
            id="Đánh giá của bạn"
            placeholder="Nhập đánh giá"
            sx={{
              width: "100%",
              ".MuiInputBase-root": { borderRadius: 6 },
            }}
          />
          <Button
            sx={{
              marginTop: 1,
              width: "20%",
              bgcolor: "#ED6436",
              color: "white",
              borderRadius: 16,
              "&:hover": { bgcolor: "#ED6436" },
              fontSize: 20,
              textTransform: "initial",
              alignSelf: "end",
            }}
          >
            Đánh giá
          </Button>
        </Box>
      </Box>
      {/* Form order */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            bgcolor="white"
            width="30%"
            position="absolute"
            top="30%"
            left="50%"
            sx={{ translate: "-50%" }}
            borderRadius={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
            padding={3}
          >
            <Typography id="transition-modal-title" variant="h5" component="h2">
              Đặt trước dịch vụ của chúng tôi
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 258 }}>
              <InputLabel id="dichvu">Dịch vụ</InputLabel>
              <Select
                labelId="dichvu"
                id="dichvu"
                value={service}
                onChange={handleChange}
                autoWidth
                label="Dịch vụ"
              >
                {shop?.services.map((s) => {
                  return (
                    <MenuItem key={s.id} value={s.id}>
                      {s.service.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Chọn thời gian"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                onChange={(v: Dayjs | null) => {
                  setDayBooking(v);
                }}
              />
            </LocalizationProvider>
            <Button
              onClick={handleSubmitBooking}
              sx={{
                marginTop: 1,
                width: "40%",
                bgcolor: "#ed6436",
                color: "white",
                borderRadius: 16,
                "&:hover": { bgcolor: "#ed6436" },
                fontSize: 20,
                textTransform: "initial",
              }}
            >
              Đặt lịch
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ShopDetail;
