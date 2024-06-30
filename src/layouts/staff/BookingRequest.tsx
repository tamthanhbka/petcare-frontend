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
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { getListBookingByStaff, updateStatus } from "../../api";

interface BookingRequestProps {}
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

const BookingRequest: FC<BookingRequestProps> = () => {
  const [service, setService] = useState<string>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: bookings, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getListBookingByStaff(),
  });
  const { mutateAsync } = useMutation({
    mutationFn: updateStatus,
  });
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (bookings?.length || 0))
      : 0;

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

  const handleChange = (event: SelectChangeEvent) => {
    setService(event.target.value);
  };

  const handleChangeStatus = (
    bookingId: number,
    status: "completed" | "accepted" | "rejected"
  ) => {
    mutateAsync({ bookingId, status })
      .then(refetch)
      .catch((e) => {
        console.error(e);
      });
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
        </Box>
        {bookings && (
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
                {(rowsPerPage > 0
                  ? bookings.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : bookings
                ).map((booking) => (
                  <TableRow>
                    <TableCell align="center">
                      <Box display="flex" gap={2}>
                        <Avatar
                          sx={{
                            border: "1px solid #757575",
                            width: 45,
                            height: 45,
                          }}
                          src={booking.fullName}
                        >
                          {booking.fullName.at(0)?.toUpperCase()}
                        </Avatar>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                        >
                          <Typography>{booking.fullName}</Typography>
                          <Typography fontSize={14} sx={{ color: "#8b8b8b" }}>
                            {booking.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{booking.serviceName}</TableCell>
                    <TableCell align="center">
                      <Typography fontSize={14}>
                        {new Date(booking.time).toLocaleDateString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={booking.status}
                        sx={{
                          color: "#FFB503",
                          bgcolor: "#FFF3D6",
                          fontWeight: 600,
                        }}
                      ></Chip>
                    </TableCell>

                    <TableCell align="center">
                      {booking.status == "pending" ? (
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            sx={{
                              textTransform: "initial",
                              bgcolor: "#5BCC08",
                              "&:hover": { bgcolor: "#56c606" },
                            }}
                            size="small"
                            variant="contained"
                            onClick={() =>
                              handleChangeStatus(booking.id, "accepted")
                            }
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
                            onClick={() =>
                              handleChangeStatus(booking.id, "rejected")
                            }
                          >
                            Từ chối
                          </Button>
                        </Box>
                      ) : booking.status == "accepted" ? (
                        <Button
                          sx={{
                            textTransform: "initial",
                            bgcolor: "#09aedb",
                            "&:hover": { bgcolor: "#08a8d4" },
                          }}
                          size="small"
                          variant="contained"
                          onClick={() =>
                            handleChangeStatus(booking.id, "completed")
                          }
                        >
                          Hoàn thành
                        </Button>
                      ) : (
                        <Button
                          sx={{
                            textTransform: "initial",
                            bgcolor: "#09aedb",
                            "&:hover": { bgcolor: "#08a8d4" },
                          }}
                          size="small"
                          variant="contained"
                          disabled
                        >
                          {booking.status === "completed"
                            ? "Hoàn thành"
                            : booking.status === "cancel"
                            ? "Đã hủy"
                            : "Đã từ chối"}
                        </Button>
                      )}
                    </TableCell>
                    {/* <TableCell align="center">
                  <IconButton>
                    <VisibilityOutlined></VisibilityOutlined>
                  </IconButton>
                </TableCell> */}
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 78 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "Tất cả", value: -1 },
                    ]}
                    colSpan={5}
                    count={bookings.length}
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
        )}

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

export default BookingRequest;
