import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, type FC } from "react";

interface ListShopProps {}
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}
const ListShop: FC<ListShopProps> = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 2) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   const handleChange = (event: SelectChangeEvent) => {
  //     setService(event.target.value);
  //   };
  return (
    <Box padding="2rem">
      <Paper elevation={5} sx={{ padding: "2rem" }}>
        <Box display="flex" justifyContent="space-between" paddingBottom="2rem">
          <FormControl sx={{ width: "15%" }} size="small">
            <InputLabel id="demo-simple-select-label">Dịch vụ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={}
              label="Dịch vụ"
              //   onChange={}
              defaultValue="0"
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              <MenuItem value={10}>Tắm gội</MenuItem>
              <MenuItem value={20}>Phẫu thuật</MenuItem>
              <MenuItem value={30}>Cắt tạo kiểu</MenuItem>
            </Select>
          </FormControl>
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
                  Khách hàng
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Dịch vụ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Thời gian
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Thao tác
                </TableCell>
                {/* <TableCell
                align="center"
                sx={{
                  textTransform: "uppercase",
                  color: "#696969",
                }}
              >
                Chi tiết
              </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Box display="flex" gap={2}>
                    <Avatar
                      sx={{
                        border: "1px solid #757575",
                        width: 45,
                        height: 45,
                      }}
                      src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/431866861_2055235028186071_413106678799918364_n.jpg?stp=dst-jpg_s320x320&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEAsHnxgbvoDnWpEGqaXy47UvKCrad9oi9S8oKtp32iL0D7zGQpV-Trk2UZ_T-tZTXlGH4FkZtsJaCC_7KiKHdj&_nc_ohc=gdSJt_LBcPIAb5TVN_P&_nc_ht=scontent.fhan14-1.fna&oh=00_AfDPdqAIn5VlB9D3nR49QssJqDuIedAUo2NzGkxNm65OnQ&oe=66189C51"
                    ></Avatar>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Typography>Lương Thị Tâm</Typography>
                      <Typography fontSize={14} sx={{ color: "#8b8b8b" }}>
                        tamthanh@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">Lưu chuồng theo ngày</TableCell>
                <TableCell align="center">
                  <Tooltip title="Thoi gian: 7:30 - 17:30">
                    <Typography fontSize={14}>30/12/2001</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label="Đang chờ xác nhận"
                    sx={{
                      color: "#FFB503",
                      bgcolor: "#FFF3D6",
                      fontWeight: 600,
                    }}
                  ></Chip>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  >
                    <Button
                      sx={{
                        textTransform: "initial",
                        bgcolor: "#5BCC08",
                        "&:hover": { bgcolor: "#56c606" },
                      }}
                      size="small"
                      variant="contained"
                    >
                      Xác nhận
                    </Button>
                    <Button
                      sx={{
                        textTransform: "initial",
                        bgcolor: "#f9903f",
                        "&:hover": { bgcolor: "#F7822A" },
                      }}
                      size="small"
                      variant="contained"
                    >
                      Từ chối
                    </Button>
                  </Box>
                </TableCell>
                {/* <TableCell align="center">
                <IconButton>
                  <VisibilityOutlined></VisibilityOutlined>
                </IconButton>
              </TableCell> */}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Box display="flex" gap={2}>
                    <Avatar
                      sx={{
                        border: "1px solid #757575",
                        width: 45,
                        height: 45,
                      }}
                      src="https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/427438215_1724834511334725_871417535767916676_n.jpg?stp=dst-jpg_s320x320&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHTAUy5QiqGt2kr1PYF5f9J9wnaMMl6HKz3CdowyXocrMn2tJ10QdCy0Ufd63vmCBE4yOenh1wyV-zjbh_ZWaOE&_nc_ohc=k5PY-8RRZbcAb4-W3WO&_nc_oc=AdhtBLjq8g-X919MIifPg3CRviA9XhwaCzLC_m2x67APN-T2ldHTa1w9-zsRYtpReutqOwzblwgns4F_cwVi6CPH&_nc_ht=scontent.fhan14-4.fna&oh=00_AfDz9XIFNqvyY5Tz-EOijPaOFrJGMnS1-Jy6ZvF9w-GNqg&oe=66198503"
                    ></Avatar>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Typography>Đinh Thị Thu Hà</Typography>
                      <Typography fontSize={14} sx={{ color: "#8b8b8b" }}>
                        thuha@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">Tiêm vắc-xin phòng nấm</TableCell>
                <TableCell align="center">
                  <Tooltip title="Thoi gian: 10:30">
                    <Typography fontSize={14}>30/12/2001</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label="Đã duyệt"
                    sx={{
                      color: "#62CE12",
                      bgcolor: "#E4F6D6",
                      fontWeight: 600,
                    }}
                  ></Chip>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  >
                    <Button
                      sx={{
                        textTransform: "initial",
                        bgcolor: "#28B7FF",
                        "&:hover": { bgcolor: "#18a6ed" },
                      }}
                      size="small"
                      variant="contained"
                    >
                      Liên hệ với khách hàng
                    </Button>
                  </Box>
                </TableCell>
                {/* <TableCell align="center">
                <IconButton>
                  <VisibilityOutlined></VisibilityOutlined>
                </IconButton>
              </TableCell> */}
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={2}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "",
                      },
                      native: true,
                    },
                  }}
                  labelRowsPerPage="Số hàng mỗi trang"
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                ></TablePagination>
              </TableRow>
            </TableFooter>
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

export default ListShop;
