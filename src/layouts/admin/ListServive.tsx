import {
  Add,
  DeleteOutlineOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
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

  // const handleFirstPageButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   onPageChange(event, 0);
  // };

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

  // const handleLastPageButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  // };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton> */}
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
      {/* <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton> */}
    </Box>
  );
}
const ListShop: FC<ListShopProps> = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 2) : 0;

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
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
    <Box padding="2rem" display="flex" gap={4}>
      <Paper elevation={5} sx={{ padding: "2rem", flex: 6 }}>
        <Box display="flex" justifyContent="space-between" paddingBottom="2rem">
          <Button
            startIcon={<Add></Add>}
            variant="contained"
            sx={{
              bgcolor: "#F9993A",
              "&:hover": { bgcolor: "#ec8319" },
              textTransform: "initial",
            }}
            // onClick={() => navigation(`/admin/shop/add`)}
          >
            Tạo dịch vụ mới
          </Button>
          <Box
            display="flex"
            gap={4}
            justifyContent="center"
            alignItems="center"
          >
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">
                Loại dịch vụ
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={service}
                label="Loại dịch vụ"
                // onChange={handleChange}
                defaultValue="0"
              >
                <MenuItem value={0}>Tất cả</MenuItem>
                <MenuItem value={10}>Tắm gội</MenuItem>
                <MenuItem value={20}>Phẫu thuật</MenuItem>
                <MenuItem value={30}>Cắt tạo kiểu</MenuItem>
              </Select>
            </FormControl>
            <OutlinedInput
              placeholder="Tìm kiếm dịch vụ"
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
                  Tên dịch vụ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Loại dịch vụ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Lượt sử dụng
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
                  <Typography>Phẫu thuật</Typography>
                </TableCell>
                <TableCell align="center">Khám chữa bệnh</TableCell>
                <TableCell align="center">
                  <Typography>500</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton sx={{ "&:hover": { bgcolor: "#ffe2e2" } }}>
                    <DeleteOutlineOutlined></DeleteOutlineOutlined>
                  </IconButton>
                </TableCell>
                {/* <TableCell align="center">
                <IconButton>
                  <VisibilityOutlined></VisibilityOutlined>
                </IconButton>
              </TableCell> */}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography>Phẫu thuật</Typography>
                </TableCell>
                <TableCell align="center">Khám chữa bệnh</TableCell>
                <TableCell align="center">
                  <Typography>500</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton sx={{ "&:hover": { bgcolor: "#ffe2e2" } }}>
                    <DeleteOutlineOutlined></DeleteOutlineOutlined>
                  </IconButton>
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
      <Paper elevation={5} sx={{ padding: "2rem", flex: 4 }}>
        <Box display="flex" justifyContent="space-between" paddingBottom="2rem">
          <Button
            startIcon={<Add></Add>}
            variant="contained"
            sx={{
              bgcolor: "#F9993A",
              "&:hover": { bgcolor: "#ec8319" },
              textTransform: "initial",
            }}
            // onClick={() => navigation(`/admin/shop/add`)}
          >
            Tạo loại dịch vụ mới
          </Button>
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
                  Loại dịch vụ
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
                <TableCell align="center">Khám chữa bệnh</TableCell>
                <TableCell align="center">
                  <IconButton sx={{ "&:hover": { bgcolor: "#ffe2e2" } }}>
                    <DeleteOutlineOutlined></DeleteOutlineOutlined>
                  </IconButton>
                </TableCell>
                {/* <TableCell align="center">
                <IconButton>
                  <VisibilityOutlined></VisibilityOutlined>
                </IconButton>
              </TableCell> */}
              </TableRow>
              <TableRow>
                <TableCell align="center">Khám chữa bệnh</TableCell>

                <TableCell align="center">
                  <IconButton sx={{ "&:hover": { bgcolor: "#ffe2e2" } }}>
                    <DeleteOutlineOutlined></DeleteOutlineOutlined>
                  </IconButton>
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
