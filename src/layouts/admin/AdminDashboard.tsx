import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { url } from "inspector";
import type { FC } from "react";
import { ChartContainer, BarPlot, BarChart } from "@mui/x-charts";
import { MoreVert, Star } from "@mui/icons-material";

const Image = styled("img")({});

interface AdminDashBoardProps {}
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const AdminDashBoard: FC<AdminDashBoardProps> = () => {
  return (
    <Box p="4rem 3rem">
      <Box display="flex" gap={4}>
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            p: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "1rem",
          }}
        >
          <Box>
            <Typography
              fontSize={35}
              fontWeight={550}
              sx={{ color: "#5a5a5a" }}
            >
              200
            </Typography>
            <Typography sx={{ color: "#747474" }}>
              Trung tâm thú y đang hợp tác
            </Typography>
          </Box>
          <Image
            sx={{ width: 70 }}
            src="https://cdn-icons-png.flaticon.com/512/1491/1491100.png"
          ></Image>
        </Paper>
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            p: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "1rem",
          }}
        >
          <Box>
            <Typography
              fontSize={35}
              fontWeight={550}
              sx={{ color: "#5a5a5a" }}
            >
              500
            </Typography>
            <Typography sx={{ color: "#747474" }}>
              Khách hàng đang sử dụng
            </Typography>
          </Box>
          <Image
            sx={{ width: 70 }}
            src="https://cdn-icons-png.freepik.com/512/3858/3858565.png"
          ></Image>
        </Paper>
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            p: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "1rem",
          }}
        >
          <Box>
            <Typography
              fontSize={35}
              fontWeight={550}
              sx={{ color: "#5a5a5a" }}
            >
              450
            </Typography>
            <Typography sx={{ color: "#747474" }}>
              Lượt đánh giá 5 sao
            </Typography>
          </Box>
          <Image
            sx={{ width: 70 }}
            src="https://cdn3.iconfinder.com/data/icons/business-set-1-flat-line/256/achievement-512.png"
          ></Image>
        </Paper>
      </Box>
      <Box display="flex" gap={4} mt={"2rem"}>
        <Paper elevation={3} sx={{ flex: 6, p: "1rem", borderRadius: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="0.5rem"
          >
            <Typography color="#463F53" fontSize={20} variant="subtitle1">
              Top dịch vụ được sử dụng nhiều nhất
            </Typography>
            <IconButton>
              <MoreVert></MoreVert>
            </IconButton>
          </Box>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: "none",
                    padding: "8px",
                    width: "5%",
                  }}
                >
                  <Avatar src="https://cdn-icons-png.freepik.com/512/147/147142.png"></Avatar>
                </TableCell>
                <TableCell sx={{ padding: "8px", borderBottom: "none" }}>
                  <Typography fontWeight={550}>Tắm gội spa</Typography>
                  <Typography fontSize={14} color="#7E7988">
                    Hệ thống thú y tropicpet
                  </Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", padding: "8px", width: "25%" }}
                >
                  <Typography fontWeight={550}>200</Typography>
                  <Typography color="#ADAAB3" fontSize={14}>
                    Lượt đặt lịch
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: "none",
                    padding: "8px",
                    width: "5%",
                  }}
                >
                  <Avatar src="https://cdn-icons-png.freepik.com/512/147/147142.png"></Avatar>
                </TableCell>
                <TableCell sx={{ padding: "8px", borderBottom: "none" }}>
                  <Typography fontWeight={550}>Tắm gội spa</Typography>
                  <Typography fontSize={14} color="#7E7988">
                    Hệ thống thú y tropicpet
                  </Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", padding: "8px", width: "25%" }}
                >
                  <Typography fontWeight={550}>200</Typography>
                  <Typography color="#ADAAB3" fontSize={14}>
                    Lượt đặt lịch
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Paper elevation={3} sx={{ flex: 9, p: "1rem", borderRadius: 3 }}>
          {/* <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="0.5rem"
          >
            <Typography color="#463F53" fontSize={20} variant="subtitle1">
              Top trung tâm thú y có đánh giá tốt nhất
            </Typography>
            <IconButton>
              <MoreVert></MoreVert>
            </IconButton>
          </Box> */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: "8px" }}>
                  <Typography>Trung tâm thú y</Typography>
                </TableCell>
                <TableCell sx={{ padding: "8px" }}>
                  <Typography>Hotline</Typography>
                </TableCell>
                <TableCell sx={{ padding: "8px" }}>
                  <Typography>Đánh giá</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ display: "flex", gap: 2, p: "10px" }}>
                  <Avatar src="https://cdn-icons-png.freepik.com/512/147/147142.png"></Avatar>
                  <Box>
                    <Typography fontWeight={550}>
                      Hệ thống thú y tropicpet
                    </Typography>
                    <Typography fontSize={14} color="#7E7988">
                      Bách Khoa, Hai Bà Trưng, Hà Nội
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ p: "10px" }}>
                  <Typography>0366833283</Typography>
                </TableCell>
                <TableCell align="center" sx={{ p: "10px" }}>
                  <Box
                    display="flex"
                    borderRadius={10}
                    bgcolor="#E4F6D6"
                    alignItems="center"
                    justifyContent="center"
                    p="4px"
                    width="70%"
                    gap={0.5}
                  >
                    <Typography>5</Typography>
                    <Star fontSize="small" sx={{ color: "#FFB400" }}></Star>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashBoard;