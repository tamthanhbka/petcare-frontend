import { VisibilityOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, type FC } from "react";

interface ListCustomerProps {}

const ListCustomer: FC<ListCustomerProps> = () => {
  const [service, setService] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    setService(event.target.value);
  };
  return (
    <Box padding="2rem">
      <Paper elevation={5} sx={{ padding: "2rem" }}>
        <Box display="flex" justifyContent="space-between" paddingBottom="2rem">
          <FormControl sx={{ width: "15%" }} size="small">
            <InputLabel id="demo-simple-select-label">Dịch vụ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={service}
              label="Dịch vụ"
              onChange={handleChange}
              defaultValue="0"
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              <MenuItem value={10}>Tắm gội</MenuItem>
              <MenuItem value={20}>Phẫu thuật</MenuItem>
              <MenuItem value={30}>Cắt tạo kiểu</MenuItem>
            </Select>
          </FormControl>
          <OutlinedInput
            placeholder="Tìm kiếm khách hàng"
            size="small"
            sx={{
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#c7c7c7",
                },
                "&:hover fieldset": {
                  borderColor: "#adadad",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e49749",
                },
              },
            }}
          ></OutlinedInput>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                  align="center"
                >
                  Ảnh
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Tên khách hàng
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Ngày sinh
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Số điện thoại
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Địa chỉ mail
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Chi tiết
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <IconButton
                    disableTouchRipple
                    sx={{ padding: 0, cursor: "auto" }}
                  >
                    <Avatar
                      sx={{
                        border: "1px solid #757575",
                        width: 45,
                        height: 45,
                      }}
                      src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/431866861_2055235028186071_413106678799918364_n.jpg?stp=dst-jpg_s320x320&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEAsHnxgbvoDnWpEGqaXy47UvKCrad9oi9S8oKtp32iL0D7zGQpV-Trk2UZ_T-tZTXlGH4FkZtsJaCC_7KiKHdj&_nc_ohc=gdSJt_LBcPIAb5TVN_P&_nc_ht=scontent.fhan14-1.fna&oh=00_AfDPdqAIn5VlB9D3nR49QssJqDuIedAUo2NzGkxNm65OnQ&oe=66189C51"
                    ></Avatar>
                  </IconButton>
                </TableCell>
                <TableCell align="center">Lương Thị Tâm</TableCell>
                <TableCell align="center">30/12/2001</TableCell>
                <TableCell align="center">0366833283</TableCell>
                <TableCell align="center">tamthanh@gmail.com</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <VisibilityOutlined></VisibilityOutlined>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /> */}
      </Paper>
    </Box>
  );
};

export default ListCustomer;
