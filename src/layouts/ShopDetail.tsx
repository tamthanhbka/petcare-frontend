import { Box, Button, Divider, Typography } from "@mui/material";
import type { FC } from "react";
import { CommentItem, ServiceItem } from "../components";

interface ShopDetailProps {}

const ShopDetail: FC<ShopDetailProps> = () => {
  return (
    <Box paddingTop="80px">
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
              Hệ thống thú y Tropicpet
            </Typography>
            <Typography
              sx={{
                fontSize: 30,
                textAlign: "center",
                width: "90%",
                lineHeight: "2.5rem",
              }}
            >
              Chúng tôi cung cấp các giải pháp và dịch vụ chăm sóc thú cưng toàn
              diện, chuyên nghiệp TOP đầu tại Hà Nội.
            </Typography>
            <Button
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
                src="https://tropicpet.vn/wp-content/uploads/2022/06/dich-vu-tiem-phong-vaccine-1-425x313.jpg"
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
          padding="2rem 12rem"
        >
          <ServiceItem />
          <ServiceItem />
          <ServiceItem />
        </Box>
      </Box>
      {/* Nhan xet cua khach hang */}
      <Box display="flex" justifyContent="center" flexDirection="column">
        <Box width="70%" paddingLeft={20}>
          <Typography fontSize={30} fontWeight={600} color="#ED6436">
            Khách hàng nói gì về chúng tôi
          </Typography>
          <Divider />
        </Box>
        <Box display="flex" gap={6} justifyContent="center" padding="0 12rem">
          <CommentItem />
          <CommentItem />
        </Box>
      </Box>
    </Box>
  );
};

export default ShopDetail;
