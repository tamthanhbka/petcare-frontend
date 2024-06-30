import { MoreVert, Star } from "@mui/icons-material";
import {
  Avatar,
  Box,
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
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import {
  findAllCustomer,
  findAllShops,
  findCommentWithValueOf5,
  getTopShop,
} from "../../api/admin";
import { ShopType } from "../../type";

const Image = styled("img")({});

interface AdminDashBoardProps {}

const AdminDashBoard: FC<AdminDashBoardProps> = () => {
  const { data: result } = useQuery({
    queryKey: ["shops"],
    queryFn: () => findAllShops(),
  });

  const { data: topShops } = useQuery<ShopType[]>({
    queryKey: ["top-shops"],
    queryFn: () => getTopShop(),
  });

  const { data: resultGetCustomer } = useQuery({
    queryKey: ["customers"],
    queryFn: () => findAllCustomer(),
  });

  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => findCommentWithValueOf5(),
  });
  // const shops = result[0];
  // console.log(resultGetCustomer);

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
              {result && result[1]}
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
              {resultGetCustomer && resultGetCustomer[1]}
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
              {comments && comments[1]}
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
              Dịch vụ được sử dụng nhiều nhất
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
                  <Typography fontWeight={550}>210</Typography>
                  <Typography color="#ADAAB3" fontSize={14}>
                    Lượt sử dụng
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
                  <Typography fontWeight={550}>Khách sạn thú cưng</Typography>
                  <Typography fontSize={14} color="#7E7988">
                    Hạnh Phúc Lông Xù
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
                  <Typography fontWeight={550}>Đỡ đẻ - Hộ sinh</Typography>
                  <Typography fontSize={14} color="#7E7988">
                    PetCare Center
                  </Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", padding: "8px", width: "25%" }}
                >
                  <Typography fontWeight={550}>150</Typography>
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
                  <Typography fontWeight={550}>
                    Chẩn đoán và điều trị bệnh
                  </Typography>
                  <Typography fontSize={14} color="#7E7988">
                    Hạnh Phúc Lông Xù
                  </Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", padding: "8px", width: "25%" }}
                >
                  <Typography fontWeight={550}>127</Typography>
                  <Typography color="#ADAAB3" fontSize={14}>
                    Lượt đặt lịch
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        {topShops && (
          <Paper elevation={3} sx={{ flex: 9, p: "1rem", borderRadius: 3 }}>
            {/* <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="0.5rem"
          >
            <Typography color="#463F53" fontSize={20} variant="subtitle1">
              Trung tâm thú y có đánh giá tốt nhất
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
                  <TableCell sx={{ padding: "8px" }} align="center">
                    <Typography>Hotline</Typography>
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }} align="center">
                    <Typography>Đánh giá</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topShops.map((topShop, key) => (
                  <TableRow key={key}>
                    <TableCell sx={{ display: "flex", gap: 2, p: "10px" }}>
                      <Avatar src="https://cdn-icons-png.freepik.com/512/147/147142.png"></Avatar>
                      <Box>
                        <Typography fontWeight={550}>{topShop.name}</Typography>
                        <Typography fontSize={14} color="#7E7988">
                          {topShop.address.detail}, {topShop.address.district}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: "10px" }} align="center">
                      <Typography>{topShop.hotline}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: "10px", width: "20%" }}>
                      <Box
                        display="flex"
                        borderRadius={10}
                        bgcolor="#E4F6D6"
                        alignItems="center"
                        justifyContent="end"
                        p="4px"
                        width="70%"
                        gap={0.5}
                        m="auto"
                      >
                        <Typography>
                          {Number(topShop.rating?.toFixed(2) || 0)}
                        </Typography>
                        <Star fontSize="small" sx={{ color: "#FFB400" }}></Star>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashBoard;
