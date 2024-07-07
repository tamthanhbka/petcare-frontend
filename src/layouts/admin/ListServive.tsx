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
import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import {
  deleteService,
  getAllParentService,
  getAllService,
} from "../../api/admin";
import CreateNewService from "./CreateNewService";
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
  const [pageParentSV, setPageParentSV] = useState(0);
  const [rowsPerPageParentSV, setRowsPerPageParentSV] = useState(5);
  const [pageSV, setPageSV] = useState(0);
  const [rowsPerPageSV, setRowsPerPageSV] = useState(5);
  const [pv, setPv] = useState("");
  const [keyName, setKeyName] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  const { data: parentService } = useQuery({
    queryKey: ["parentService"],
    queryFn: () => getAllParentService(),
    initialData: [],
  });

  const { data: services, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllService(),
    initialData: [],
  });

  const filterServices = services.filter((sv) => {
    return (
      sv.parentName.includes(pv) &&
      sv.name.toLowerCase().includes(keyName.toLowerCase())
    );
  });

  const emptyRowsParentSV =
    pageParentSV > 0
      ? Math.max(
          0,
          (1 + pageParentSV) * rowsPerPageParentSV - parentService.length
        )
      : 0;

  const emptyRowsSV =
    pageSV > 0
      ? Math.max(0, (1 + pageSV) * rowsPerPageSV - filterServices.length)
      : 0;

  const handleChangePageParentSV = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageParentSV(newPage);
  };

  const handleChangeRowsPerPageParentSV = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPageParentSV(parseInt(event.target.value, 10));
    setPageParentSV(0);
  };

  const handleChangePageSV = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageSV(newPage);
  };

  const handleChangeRowsPerPageSV = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPageSV(parseInt(event.target.value, 10));
    setPageSV(0);
  };

  //   const handleChange = (event: SelectChangeEvent) => {
  //     setService(event.target.value);
  //   };
  const handleOpenCreate = (open?: boolean) => () => setOpenCreate(!!open);

  const handleDelete = (id: number) => {
    deleteService(id)
      .then(() => {
        toast.success("Xóa dịch vụ thành công!");
        refetch();
      })
      .catch(() => toast.error("Xóa dịch vụ thất bại!"));
  };
  return (
    <Box padding="2rem" display="flex" gap={2}>
      <Paper elevation={3} sx={{ padding: "2rem", flex: 9 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          paddingBottom="1rem"
          gap={4}
        >
          <Button
            onClick={handleOpenCreate(true)}
            startIcon={<Add></Add>}
            variant="contained"
            sx={{
              bgcolor: "#F9993A",
              "&:hover": { bgcolor: "#ec8319" },
              textTransform: "initial",
              flex: 1,
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
            flex={3}
          >
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Loại dịch vụ
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pv}
                label="Loại dịch vụ"
                onChange={(e) => setPv(e.target.value)}
                defaultValue={""}
              >
                <MenuItem value={""}>Tất cả</MenuItem>
                {parentService.map((sp) => (
                  <MenuItem key={sp.id} value={sp.name}>
                    {sp.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <OutlinedInput
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              fullWidth
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
              {(rowsPerPageSV > 0
                ? filterServices.slice(
                    pageSV * rowsPerPageSV,
                    pageSV * rowsPerPageSV + rowsPerPageSV
                  )
                : filterServices
              ).map((sv, i) => (
                <TableRow key={i}>
                  <TableCell align="center">
                    <Typography>{sv.name}</Typography>
                  </TableCell>
                  <TableCell align="center">{sv.parentName}</TableCell>
                  <TableCell align="center">
                    <Typography>{sv.count}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleDelete(sv.id)}
                      sx={{ "&:hover": { bgcolor: "#ffe2e2" } }}
                    >
                      <DeleteOutlineOutlined></DeleteOutlineOutlined>
                    </IconButton>
                  </TableCell>
                  {/* <TableCell align="center">
            <IconButton>
              <VisibilityOutlined></VisibilityOutlined>
            </IconButton>
          </TableCell> */}
                </TableRow>
              ))}
              {emptyRowsSV > 0 && (
                <TableRow style={{ height: 78 * emptyRowsSV }}>
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
                  count={filterServices.length}
                  rowsPerPage={rowsPerPageSV}
                  page={pageSV}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "",
                      },
                      native: true,
                    },
                  }}
                  labelRowsPerPage="Số hàng mỗi trang"
                  onPageChange={handleChangePageSV}
                  onRowsPerPageChange={handleChangeRowsPerPageSV}
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
      <Paper
        elevation={3}
        sx={{ padding: "2rem", flex: 6, alignSelf: "start" }}
      >
        <Box display="flex" justifyContent="space-between" paddingBottom="1rem">
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
              {(rowsPerPageParentSV > 0
                ? parentService.slice(
                    pageParentSV * rowsPerPageParentSV,
                    pageParentSV * rowsPerPageParentSV + rowsPerPageParentSV
                  )
                : parentService
              ).map((parentSV, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{parentSV.name}</TableCell>
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
              ))}
              {emptyRowsParentSV > 0 && (
                <TableRow style={{ height: 78 * emptyRowsParentSV }}>
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
                  count={parentService.length}
                  rowsPerPage={rowsPerPageParentSV}
                  page={pageParentSV}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "",
                      },
                      native: true,
                    },
                  }}
                  labelRowsPerPage="Số hàng mỗi trang"
                  onPageChange={handleChangePageParentSV}
                  onRowsPerPageChange={handleChangeRowsPerPageParentSV}
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
      <CreateNewService
        open={openCreate}
        parentServices={parentService}
        onClose={handleOpenCreate(false)}
        refetch={refetch}
      />
    </Box>
  );
};

export default ListShop;
