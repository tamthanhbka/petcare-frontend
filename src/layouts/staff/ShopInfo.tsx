import { CloudUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, type FC } from "react";
import { toast } from "react-toastify";
import {
  getMaxCustomerByStaff,
  getShopByStaff,
  updateMaxCustomerByStaff,
  updateShopByStaff,
  uploadImg,
} from "../../api";
import { getCommunes, getDistricts, getProvinces } from "../../api/address";
import { MaxCustomerType, ProvinceType, ShopType } from "../../type";

const Image = styled("img")({});
interface ShopInfoProps {}
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

const CssTextField = styled(TextField)({
  margin: "0.5rem",
  borderRadius: "10px",
  "& label.Mui-focused": {
    color: "#2E7D32",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#c7c7c7",
    },
    "&:hover fieldset": {
      borderColor: "#2E7D32",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#617f62",
    },
  },
});

const ShopInfo: FC<ShopInfoProps> = () => {
  const [shop, setShop] = useState<ShopType>();
  const [maxCustomerSpa, setMaxCustomerSpa] = useState<MaxCustomerType>();
  const [maxCustomerHealth, setMaxCustomerHealth] = useState<MaxCustomerType>();
  const [maxCustomerHotel, setMaxCustomerHotel] = useState<MaxCustomerType>();
  const [img, setImg] = useState<File>();
  const { data } = useQuery<ShopType>({
    queryKey: [`shop`],
    queryFn: () => getShopByStaff(),
    refetchOnWindowFocus: false,
  });
  const { data: recentMaxCustomer } = useQuery<MaxCustomerType[]>({
    queryKey: [`customer`],
    queryFn: () => getMaxCustomerByStaff(),
    refetchOnWindowFocus: false,
  });

  const { data: provinces } = useQuery<ProvinceType[]>({
    queryKey: [`provinces`],
    queryFn: () => getProvinces(),
    refetchOnWindowFocus: false,
  });

  const { mutate: findDistricts, data: districts } = useMutation({
    mutationFn: (p: string) => getDistricts(p),
  });

  const { mutate: findWards, data: wards } = useMutation({
    mutationFn: (d: string) => getCommunes(d),
  });

  useEffect(() => {
    if (recentMaxCustomer)
      recentMaxCustomer.forEach((max) => {
        if (max.serviceId === 1) setMaxCustomerSpa(max);
        if (max.serviceId === 2) setMaxCustomerHealth(max);
        if (max.serviceId === 3) setMaxCustomerHotel(max);
      });
  }, [recentMaxCustomer]);

  useEffect(() => {
    if (data) {
      setShop(data);
    }
  }, [data]);

  useEffect(() => {
    if (provinces && shop) {
      const province = provinces.find((p) => p.name === shop.address.province);
      if (province) {
        findDistricts(province.code);
      }
    }
  }, [shop, provinces, findDistricts]);

  useEffect(() => {
    if (districts && shop) {
      const district = districts.find((d) => d.name === shop.address.district);
      if (district) {
        findWards(district.code);
      }
    }
  }, [shop, districts, findWards]);

  const handleUpdateButton = async () => {
    if (shop) {
      if (maxCustomerSpa) {
        updateMaxCustomerByStaff(
          maxCustomerSpa.serviceId,
          maxCustomerSpa.maxCustomer
        );
      }
      if (maxCustomerHealth) {
        updateMaxCustomerByStaff(
          maxCustomerHealth.serviceId,
          maxCustomerHealth.maxCustomer
        );
      }
      if (maxCustomerHotel) {
        updateMaxCustomerByStaff(
          maxCustomerHotel.serviceId,
          maxCustomerHotel.maxCustomer
        );
      }
      const image = img ? await uploadImg(img) : shop.avatar;
      // setShop({ ...shop, avatar: image || shop.avatar });
      updateShopByStaff({ ...shop, avatar: image }).then(() =>
        toast.success("Cập nhật thông tin thành công!")
      );
      return;
    }
    toast.error("Cập nhật thông tin thất bại!");
  };
  console.table(shop);
  return (
    <Box padding={"2rem"}>
      {shop && (
        <Paper elevation={4} sx={{ display: "flex" }}>
          <Box
            flex={5}
            maxWidth={"500px"}
            display={"flex"}
            padding={"2rem"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent="flex-start"
            gap={3.5}
          >
            <Box
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
              justifyContent="center"
              gap={2}
            >
              <Image
                sx={{
                  width: "100%",
                  borderRadius: ".5rem",
                  boxShadow: "0px 0px 5px -1px rgb(111, 111, 111)",
                  objectFit: "cover",
                  border: "1px solid rgba(255, 255, 255,1)",
                }}
                src={
                  shop?.avatar
                    ? shop.avatar
                    : "https://freelancervietnam.vn/wp-content/uploads/2020/07/post-thumb-dich-vu-cham-soc.jpg"
                }
              />

              <Button
                color="success"
                // role={undefined}
                variant="outlined"
                // tabIndex={-1}
                startIcon={<CloudUpload />}
                sx={{ width: "45%", textTransform: "initial" }}
              >
                {/* <VisuallyHiddenInput type="file" /> */}
                <label htmlFor="avatar_input">Đổi ảnh đại diện</label>
                <input
                  id="avatar_input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const img = e.target.files?.[0];
                    if (!img) return;
                    setImg(img);
                    const reader = new FileReader();
                    reader.onload = (v) => {
                      // setShop((prv) => ({
                      //   ...prv,
                      //   avatar: v.target?.result?.toString(),
                      // }));
                      setShop({
                        ...shop,
                        avatar: v.target?.result?.toString() || shop.avatar,
                      });
                    };
                    reader.readAsDataURL(img);
                  }}
                />
              </Button>
            </Box>
            <Box
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
              justifyContent="center"
              gap={1}
            >
              <Typography sx={{ fontStyle: "revert" }}>
                Số khách hàng tối đa có thể tiếp đón tại một thời điểm:
              </Typography>
              <FormControl sx={{ display: "flex", flexDirection: "row" }}>
                {maxCustomerSpa && (
                  <CssTextField
                    label="Spa-làm đẹp"
                    id="custom-css-outlined-input"
                    value={maxCustomerSpa?.maxCustomer}
                    onChange={(e) =>
                      setMaxCustomerSpa({
                        ...maxCustomerSpa,
                        maxCustomer: +e.target.value,
                      })
                    }
                  />
                )}
                {maxCustomerHealth && (
                  <CssTextField
                    label="Khám sức khỏe"
                    id="custom-css-outlined-input"
                    value={maxCustomerHealth?.maxCustomer}
                    onChange={(e) =>
                      setMaxCustomerHealth({
                        ...maxCustomerHealth,
                        maxCustomer: +e.target.value,
                      })
                    }
                  />
                )}
                {maxCustomerHotel && (
                  <CssTextField
                    label="Khách sạn"
                    id="custom-css-outlined-input"
                    value={maxCustomerHotel?.maxCustomer}
                    onChange={(e) =>
                      setMaxCustomerHotel({
                        ...maxCustomerHotel,
                        maxCustomer: +e.target.value,
                      })
                    }
                  />
                )}
              </FormControl>
            </Box>
          </Box>
          <Box
            flex={8}
            display="flex"
            flexDirection="column"
            padding="2rem"
            component="form"
            noValidate
            sx={{
              display: "grid",
            }}
          >
            <FormControl>
              <CssTextField
                label="Tên trung tâm chăm sóc thú y"
                id="custom-css-outlined-input"
                value={shop?.name}
                onChange={(e) => setShop({ ...shop, name: e.target.value })}
              />
              <CssTextField
                label="Solgan"
                id="custom-css-outlined-input"
                value={shop?.slogan}
                onChange={(e) => setShop({ ...shop, slogan: e.target.value })}
              />
              <CssTextField
                label="Hotline"
                id="custom-css-outlined-input"
                value={shop?.hotline}
                onChange={(e) => setShop({ ...shop, hotline: e.target.value })}
              />
            </FormControl>

            <Box display="flex" justifyContent="center" flexDirection="column">
              <FormControl sx={{ m: 1, minWidth: "30%" }}>
                <InputLabel id="demo-multiple-name-label">
                  Thành phố/Tỉnh
                </InputLabel>
                <Select
                  // defaultValue={shop.address?.province}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={shop.address.province}
                  onChange={(e) =>
                    setShop({
                      ...shop,
                      address: {
                        ...shop.address,
                        province: e.target.value,
                        district: "",
                        ward: "",
                      },
                    })
                  }
                  input={<OutlinedInput label="Tinh/Thanh pho" />}
                  MenuProps={MenuProps}
                >
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
              <FormControl sx={{ m: 1, minWidth: "30%" }}>
                <InputLabel id="demo-multiple-name-label">
                  Quận/Huyện
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={shop.address.district}
                  onChange={(e) =>
                    setShop({
                      ...shop,
                      address: { ...shop.address, district: e.target.value },
                    })
                  }
                  input={<OutlinedInput label="Quận/Huyện" />}
                  MenuProps={MenuProps}
                >
                  {districts &&
                    districts.map((d) => (
                      <MenuItem
                        key={d.code}
                        value={d.name}
                        // style={getStyles(name, personName, theme)}
                      >
                        {d.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: "30%" }}>
                <InputLabel id="demo-multiple-name-label">Phường/Xã</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={shop.address.ward}
                  onChange={(e) =>
                    setShop({
                      ...shop,
                      address: { ...shop.address, ward: e.target.value },
                    })
                  }
                  input={<OutlinedInput label="Phường/Xã" />}
                  MenuProps={MenuProps}
                >
                  {wards &&
                    wards.map((w) => (
                      <MenuItem
                        key={w.code}
                        value={w.name}
                        // style={getStyles(name, personName, theme)}
                      >
                        {w.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <CssTextField
              onChange={(e) =>
                setShop({
                  ...shop,
                  address: { ...shop.address, detail: e.target.value },
                })
              }
              label="Địa chỉ chi tiết"
              id="custom-css-outlined-input"
              value={shop?.address?.detail}
            />
            <Box
              display="flex"
              gap="1rem"
              justifyContent="flex-end"
              marginTop="1rem"
            >
              <Button
                variant="contained"
                sx={{ bgcolor: "#41b447", "&:hover": { bgcolor: "#3a9a3f" } }}
                onClick={handleUpdateButton}
              >
                Lưu thay đổi
              </Button>
              {/* <Button
                variant="outlined"
                sx={{
                  color: "#41b447",
                  borderColor: "#41b447",
                  "&:hover": { borderColor: "#3a9a3f" },
                }}
              >
                Xóa
              </Button> */}
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ShopInfo;
