import {
  Add,
  DeleteOutlineOutlined,
  Edit,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Link,
  OutlinedInput,
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
  styled,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { Link as RTLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllServiceByStaff, removeShopServiceByStaff } from "../../api";
import { ServiceShopType } from "../../type";
const Image = styled("img")({});

interface ListServiceProps {}
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

const ListService: FC<ListServiceProps> = () => {
  const navigation = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [key, setKey] = useState<string>("");
  const { data: services, refetch } = useQuery<ServiceShopType[]>({
    queryKey: [`services`],
    queryFn: () => getAllServiceByStaff(),
    initialData: [],
    refetchOnWindowFocus: false,
  });
  const filtered = services.filter((sv) =>
    sv.service.name.toLowerCase().includes(key.toLowerCase())
  );
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (filtered?.length || 0))
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

  const handleDeleteButton = (id: string) => {
    removeShopServiceByStaff(id).then(() => {
      toast.success("Xóa dịch vụ thành công!");
      refetch();
    });
  };
  return (
    <Box padding="2rem">
      <Paper elevation={5} sx={{ padding: "1.5rem" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          paddingBottom="0.5rem"
        >
          <Button
            startIcon={<Add></Add>}
            variant="contained"
            sx={{
              bgcolor: "#F9993A",
              "&:hover": { bgcolor: "#ec8319" },
              textTransform: "initial",
            }}
            onClick={() => navigation(`/staff/services/add`)}
          >
            Thêm dịch vụ mới
          </Button>

          <OutlinedInput
            placeholder="Tìm kiếm dịch vụ"
            onChange={(e) => setKey(e.target.value)}
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
              <TableRow style={{ height: 78 }}>
                <TableCell
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                  }}
                  align="center"
                >
                  Ảnh dịch vụ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                    // width: "20%",
                  }}
                >
                  Tên dịch vụ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                    // width: "30%",
                  }}
                >
                  Mô tả
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                    // width: "20%",
                  }}
                >
                  Khoảng giá
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    color: "#696969",
                    // width: "10%",
                  }}
                >
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ width: "100%" }}>
              {(rowsPerPage > 0
                ? filtered.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filtered
              ).map((s, key) => (
                <TableRow key={key}>
                  <TableCell
                    align="center"
                    // sx={{ display: "inline-block", width: "20%" }}
                  >
                    <Image
                      sx={{ height: "42px", border: "1px solid #c1c1c1" }}
                      src={
                        s.image ??
                        "https://thanhcongfarm.com/wp-content/uploads/2022/10/320456_best_dog_spa_0.jpg"
                      }
                    ></Image>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      width: "200px",
                    }}
                  >
                    <Link component={RTLink} to={s.id + ""} underline="hover">
                      {s.service.name}
                    </Link>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "400px",
                        overflow: "hidden",
                      }}
                    >
                      {s.description}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    // sx={{
                    //   whiteSpace: "nowrap",
                    //   width: "20%",
                    //   display: "inline-block",
                    // }}
                  >
                    {s.lowestPrice.toLocaleString()} -{" "}
                    {s.highestPrice.toLocaleString()} VND
                  </TableCell>
                  <TableCell
                  // sx={{
                  //   overflow: "hidden",
                  //   whiteSpace: "nowrap",
                  //   display: "inline-block",
                  //   width: "10%",
                  // }}
                  >
                    <IconButton onClick={() => navigation(`${s.id}`)}>
                      <Edit></Edit>
                    </IconButton>
                    <IconButton onClick={() => handleDeleteButton(`${s.id}`)}>
                      <DeleteOutlineOutlined color="error"></DeleteOutlineOutlined>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 80 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={filtered.length}
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

export default ListService;
