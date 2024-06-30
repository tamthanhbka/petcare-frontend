import {
  Add,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  LockOutlined,
  RemoveRedEyeOutlined,
  Star,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
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
import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { getProvinces } from "../../api/address";
import { findAllShops } from "../../api/admin";
import { ProvinceType, ShopType } from "../../type";

interface ListShopProps {}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
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
  const navigation = useNavigate();
  const [province, setProvince] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [shops, setShops] = useState<ShopType[]>();
  const { data: result } = useQuery({
    queryKey: ["listShop"],
    queryFn: () => findAllShops(),
  });

  const { data: provinces } = useQuery<ProvinceType[]>({
    queryKey: [`provinces`],
    queryFn: () => getProvinces(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (result) {
      setShops(result[0]);
    }
  }, [result]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (shops?.length || 0)) : 0;

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
    <Box padding="2rem">
      <Paper elevation={5} sx={{ padding: "2rem" }}>
        <Box display="flex" justifyContent="space-between" paddingBottom="2rem">
          <Button
            startIcon={<Add></Add>}
            variant="contained"
            sx={{
              bgcolor: "#F9993A",
              "&:hover": { bgcolor: "#ec8319" },
              textTransform: "initial",
            }}
            onClick={() => navigation(`/admin/shop/add`)}
          >
            Tạo trung tâm thú y mới
          </Button>
          <Box
            display="flex"
            gap={4}
            justifyContent="center"
            alignItems="center"
            width="40%"
          >
            <FormControl size="small" sx={{ width: "60%" }}>
              {/* <InputLabel id="demo-multiple-name-label">
                Thành phố/Tỉnh
              </InputLabel> */}
              <Select
                // defaultValue={shop.address?.province}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={province}
                // input={<OutlinedInput label="Tinh/Thanh pho" />}
                MenuProps={MenuProps}
                onChange={(e) => setProvince(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Tất cả</MenuItem>
                {provinces &&
                  provinces.map((p) => (
                    <MenuItem
                      key={p.code}
                      value={p.name}
                      // style={getStyles(name, personName, theme)}
                    >
                      {p.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <OutlinedInput
              placeholder="Tìm kiếm trung tâm thú y"
              size="small"
              sx={{
                width: "60%",
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
        {shops && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      textTransform: "uppercase",
                      color: "#696969",
                      width: "300px",
                    }}
                  >
                    Trung tâm thú y
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      textTransform: "uppercase",
                      color: "#696969",
                      width: "300px",
                      // maxWidth: "30%",
                    }}
                  >
                    Slogan
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      textTransform: "uppercase",
                      color: "#696969",
                      width: "120px",
                    }}
                  >
                    Hotline
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      textTransform: "uppercase",
                      color: "#696969",
                      width: "130px",
                    }}
                  >
                    Đánh giá
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      textTransform: "uppercase",
                      color: "#696969",
                      width: "120px",
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
                  ? shops.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : shops
                ).map((shop, key) => (
                  <TableRow key={key} sx={{ height: 78 }}>
                    <TableCell align="center" sx={{ maxWidth: "300px" }}>
                      <Box display="flex" gap={2}>
                        <Avatar
                          sx={{
                            border: "1px solid #757575",
                            width: 45,
                            height: 45,
                          }}
                          src={shop.avatar}
                        >
                          {shop.avatar ? null : shop.name.at(0)?.toUpperCase()}
                        </Avatar>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                          // // width="30%"
                          // overflow="hidden"
                          // textOverflow="ellipsis"
                        >
                          <Typography>{shop.name}</Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: "#8b8b8b",
                              // overflow: "hidden",
                              // whiteSpace: "nowrap",
                              // textOverflow: "ellipsis",
                              // display: "inline-block",
                              // width: "100%",
                            }}
                          >
                            {shop.address.detail}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "300px",
                        // overflow: "hidden",
                        // textOverflow: "ellipsis",
                      }}
                    >
                      <Typography
                        sx={{
                          textOverflow: "ellipsis",
                          display: "inline-block",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          width: "100%",
                          // fontSize: "14px",
                        }}
                      >
                        {shop.slogan}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={16}>{shop.hotline}</Typography>
                    </TableCell>
                    <TableCell align="center">
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
                          {Number(shop.rating?.toFixed(2) || 0)}
                        </Typography>
                        <Star fontSize="small" sx={{ color: "#FFB400" }}></Star>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton sx={{ "&:hover": { bgcolor: "#ffebd7" } }}>
                        <RemoveRedEyeOutlined></RemoveRedEyeOutlined>
                      </IconButton>
                      <IconButton sx={{ "&:hover": { bgcolor: "#ffe2e2" } }}>
                        <LockOutlined></LockOutlined>
                      </IconButton>
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
                    count={shops.length}
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
