import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, type FC } from "react";
import { toast } from "react-toastify";
import { sendRequestCooperation } from "../api";
import { getCommunes, getDistricts, getProvinces } from "../api/address";
import { ProvinceType } from "../type";

interface RequestFromProps {
  open: boolean;
  handleClose: () => void;
}
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
const Image = styled("img")({});
const CssTextField = styled(TextField)({
  //   lineHeight: "14px",
  "& label.Mui-focused": {
    color: "#2E7D32",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#c7c7c7",
      //   padding: "5px",
    },
    "&:hover fieldset": {
      borderColor: "#2E7D32",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#617f62",
    },
  },
});

const RequestFrom: FC<RequestFromProps> = (props) => {
  const [email, setEmail] = useState<string>();
  const [shopName, setShopName] = useState<string>();
  const [slogan, setSlogan] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [ward, setWard] = useState<string>();
  const [detail, setDetail] = useState<string>();
  const { open, handleClose } = props;
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
    if (provinces && province) {
      const result = provinces.find((p) => p.name === province);
      if (result) {
        findDistricts(result.code);
      }
    }
  }, [findDistricts, province, provinces]);

  useEffect(() => {
    if (districts && district) {
      const result = districts.find((d) => d.name === district);
      if (result) {
        findWards(result.code);
      }
    }
  }, [district, districts, findWards]);
  const handleRequestButton = async () => {
    if (
      email &&
      shopName &&
      slogan &&
      phone &&
      province &&
      district &&
      ward &&
      detail
    ) {
      try {
        sendRequestCooperation(
          email,
          shopName,
          slogan,
          phone,
          province,
          district,
          ward,
          detail
        );
        toast.success("Gửi yêu cầu hợp tác thành công!");
      } catch (error) {
        toast.error("Gửi yêu cầu hợp tác thất bại!");
        // setOpen(false);
      }
      handleClose();
      return;
    }
    toast.error(
      "Vui lòng điền đầy đủ các thông tin trước khi gửi yêu cầu hợp tác!"
    );
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Box
        bgcolor="white"
        borderRadius="0.5rem"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box width={"100%"}>
          <Image
            src="https://aglobal.vn/upload/images/Banner%20AGlobal%20%2866%29.png"
            width={"100%"}
            height={"200px"}
            sx={{ borderRadius: "0.5rem 0.5rem 0 0", objectFit: "cover" }}
          ></Image>
        </Box>
        <Box
          padding="1.5rem"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={2}
        >
          <Box paddingBottom={"1rem"}>
            <Typography variant="h5">Hợp tác với chúng tôi</Typography>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={1.5}
            >
              <CssTextField
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></CssTextField>
              <CssTextField
                label="Tên shop"
                onChange={(e) => setShopName(e.target.value)}
              ></CssTextField>
              <CssTextField
                label="Khẩu hiệu"
                onChange={(e) => setSlogan(e.target.value)}
              ></CssTextField>
              <CssTextField
                label="Số điện thoại"
                onChange={(e) => setPhone(e.target.value)}
              ></CssTextField>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={1.5}
            >
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">
                  Thành phố/Tỉnh
                </InputLabel>
                <Select
                  // defaultValue={requestCooperation?.province}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
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
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">
                  Quận/Huyện
                </InputLabel>
                <Select
                  // defaultValue={shop.address?.province}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  input={<OutlinedInput label="Tinh/Thanh pho" />}
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
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">Phường/Xã</InputLabel>
                <Select
                  // defaultValue={shop.address?.province}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  input={<OutlinedInput label="Tinh/Thanh pho" />}
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
              <CssTextField
                label="Địa chỉ chi tiết"
                onChange={(e) => setDetail(e.target.value)}
              ></CssTextField>
            </Box>
          </Box>
          <Button
            sx={{
              bgcolor: "#ED6436",
              color: "white",
              textTransform: "inherit",
              "&:hover": { bgcolor: "#ED6436" },
            }}
            onClick={handleRequestButton}
          >
            Gửi yêu cầu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RequestFrom;
