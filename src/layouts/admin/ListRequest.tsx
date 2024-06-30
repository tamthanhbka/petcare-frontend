import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
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
import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { toast } from "react-toastify";
import {
  acceptedRequestCooperation,
  getAllRequestCooperation,
} from "../../api/admin";
import { RequestCooperationType } from "../../type";

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

  const { data: request } = useQuery<RequestCooperationType[]>({
    queryKey: ["list-request"],
    queryFn: () => getAllRequestCooperation(),
    initialData: [],
  });

  // console.log(request);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (request.length || 0))
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

  const handleAcceptedRequestCooperation = async (id: number) => {
    try {
      acceptedRequestCooperation(id);
      toast.success("Chấp nhận yêu cầu hợp tác thành công!");
    } catch (error) {
      toast.success("Chấp nhận yêu cầu hợp tác thất bại!");
    }
  };
  //   const handleChange = (event: SelectChangeEvent) => {
  //     setService(event.target.value);
  //   };
  return (
    <Box padding="2rem">
      <Paper elevation={5} sx={{ padding: "2rem" }}>
        {request && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{
                      textTransform: "uppercase",
                      color: "#696969",
                    }}
                  >
                    <Typography>Trung tâm thú y</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      textTransform: "uppercase",
                      color: "#696969",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      textTransform: "uppercase",
                      color: "#696969",
                    }}
                  >
                    Slogan
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
                  {/* <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                >
                  Trạng thái
                </TableCell> */}
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
                  ? request.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : request
                ).map((r, key) => (
                  <TableRow key={key} sx={{ height: 78 }}>
                    <TableCell align="left">
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        // justifyContent={"end"}
                      >
                        <Typography>{r.shopName}</Typography>
                        <Typography fontSize={14} sx={{ color: "#777777" }}>
                          {r.detail}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{r.email}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{r.slogan}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{r.phone}</Typography>
                    </TableCell>
                    {/* <TableCell align="center">
                  <Chip
                    sx={{ bgcolor: "#FFF3D6" }}
                    label="Đang chờ duyệt"
                  ></Chip>
                </TableCell> */}
                    <TableCell align="center">
                      <Button
                        sx={{
                          borderRadius: 8,
                          bgcolor: "#FBA442",
                          color: "white",
                          p: "6px 16px",
                          textTransform: "initial",
                          "&:hover": { bgcolor: "#ef9631" },
                        }}
                        onClick={() => handleAcceptedRequestCooperation(r.id)}
                      >
                        Duyệt yêu cầu
                      </Button>
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
                    count={request.length}
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

export default ListShop;
