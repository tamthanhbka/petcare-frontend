import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  LockOpen,
  LockOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
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
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { blockUser, getAllUser, openUser } from "../../api/admin";
import { toast } from "react-toastify";

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
  const [keyName, setKeyName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(),
    initialData: [],
  });

  const filterUsers = users.filter((u) =>
    u.fullName?.toLowerCase().includes(keyName.toLowerCase())
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterUsers.length) : 0;

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

  const handleBlockUser = (userId: number) => {
    blockUser(userId)
      .then(() => {
        refetch();
        toast.success("Chặn tài khoản thành công!");
      })
      .catch(() => {
        toast.error("Chặn tài khoản thất bại!");
      });
  };

  const handleOpenUser = (userId: number) => {
    openUser(userId)
      .then(() => {
        refetch();
        toast.success("Kích hoạt tài khoản thành công!");
      })
      .catch(() => {
        toast.error("Kích hoạt tài khoản thất bại!");
      });
  };
  return (
    <Box padding="2rem">
      <Paper elevation={5} sx={{ padding: "2rem" }}>
        <Box display="flex" justifyContent="space-between" paddingBottom="1rem">
          {/* <Button
            startIcon={<Add></Add>}
            variant="contained"
            sx={{
              bgcolor: "#F9993A",
              "&:hover": { bgcolor: "#ec8319" },
              textTransform: "initial",
            }}
            // onClick={() => navigation(`/admin/shop/add`)}
          >
            Tạo trung tâm thú y mới
          </Button> */}

          <OutlinedInput
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="Tìm kiếm người dùng"
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
                >
                  <Typography sx={{ ml: 8 }}>Khách hàng</Typography>
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
                  Ngày sinh
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
                  Vai trò
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
                ? filterUsers.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filterUsers
              ).map((user, index) => (
                <TableRow key={index} sx={{ height: 78 }}>
                  <TableCell align="center">
                    <Box display="flex" gap={2}>
                      <Avatar
                        sx={{
                          border: "1px solid #757575",
                          width: 45,
                          height: 45,
                        }}
                        src={user.avatar}
                      >
                        {user.avatar
                          ? null
                          : user.fullName
                          ? user.fullName.at(0)?.toUpperCase()
                          : ""}
                      </Avatar>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <Typography>{user.fullName}</Typography>
                        <Typography fontSize={13} sx={{ color: "#8b8b8b" }}>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{user.phone}</TableCell>
                  <TableCell align="center">
                    <Typography fontSize={14}>
                      {new Date(user.dateOfBirth).toLocaleDateString("vi-VN")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={user.isActive ? "Được kích hoạt" : "Bị chặn"}
                      sx={{
                        backgroundColor: user.isActive ? "#f1fbe9" : "#ECEDEE",
                        color: user.isActive ? " #61CD10" : "#93969B",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    ></Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={
                        user.role == "user"
                          ? "Người dùng"
                          : user.role == "staff"
                          ? "Nhân viên"
                          : "Quản trị viên"
                      }
                      sx={{
                        backgroundColor:
                          user.role == "user"
                            ? "#f1fbe9"
                            : user.role == "staff"
                            ? "#f5f0ff"
                            : "#fff8e8",
                        color:
                          user.role == "user"
                            ? " #61CD10"
                            : user.role == "staff"
                            ? "#925FFF"
                            : "#FFB400",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    ></Chip>
                  </TableCell>
                  <TableCell align="center">
                    {/* <IconButton sx={{ "&:hover": { bgcolor: "#DAF2FF" } }}>
                        <RemoveRedEyeOutlined></RemoveRedEyeOutlined>
                      </IconButton> */}
                    {user.isActive ? (
                      <IconButton
                        onClick={() => handleBlockUser(user.id)}
                        sx={{ "&:hover": { bgcolor: "#ffe2e2" } }}
                      >
                        <LockOutlined></LockOutlined>
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleOpenUser(user.id)}
                        sx={{ "&:hover": { bgcolor: "#f1fbe9" } }}
                      >
                        <LockOpen></LockOpen>
                      </IconButton>
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
                  colSpan={6}
                  count={filterUsers.length}
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
