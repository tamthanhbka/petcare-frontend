import { ArrowBack, PhotoCameraBackOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  styled,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addShopServiceByStaff, getListServiceByStaff } from "../../api";
import { ServiceType } from "../../type";
// const Image = styled("img")({});
interface CreateNewServiceProps {}
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

const CreateNewService: FC<CreateNewServiceProps> = () => {
  const navigation = useNavigate();
  const [service, setService] = useState<ServiceType>();
  const [description, setDescription] = useState<string>();
  const [lowestPrice, setLowestPrice] = useState<number>();
  const [highestPrice, setHighestPrice] = useState<number>();

  const { data: services } = useQuery<ServiceType[]>({
    queryKey: [`service`],
    queryFn: () => getListServiceByStaff(),
    refetchOnWindowFocus: false,
  });

  const handleChangeService = (e: SelectChangeEvent) => {
    setService(services?.find((s) => s.name === e.target.value));
  };

  const handleAddButton = () => {
    addShopServiceByStaff(
      description,
      lowestPrice,
      highestPrice,
      service?.id
    ).then(() => {
      toast("Thêm dịch vụ thành công!");
      navigation(`/staff/services`);
    });
  };

  return (
    <Box padding={"2rem"}>
      {
        <Paper elevation={4} sx={{ display: "flex", position: "relative" }}>
          <ArrowBack
            onClick={() => navigation(`/staff/services`)}
            sx={{
              cursor: "pointer",
              position: "absolute",
              left: 15,
              top: 15,
              color: "#7a7a7a",
              "&:hover": { color: "#676767" },
            }}
          ></ArrowBack>
          <Box
            flex={5}
            width={"100%"}
            display={"flex"}
            padding={"2rem"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent="center"
            gap={2}
          >
            {/* <Image
              sx={{
                width: "100%",
                // height: "100%",
                borderRadius: "1rem",
              }}
              src={
                "https://thanhcongfarm.com/wp-content/uploads/2022/10/320456_best_dog_spa_0.jpg"
              }
            /> */}
            <input
              accept="image"
              type="file"
              id="select-image"
              style={{ display: "none" }}
            />
            <label htmlFor="select-image">
              <Button
                color="success"
                // role={undefined}
                variant="outlined"
                // tabIndex={-1}
                // startIcon={<CloudUpload />}
                sx={{
                  width: "100%",
                  textTransform: "initial",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <PhotoCameraBackOutlined
                  sx={{ fontSize: "10rem", color: "#91CB63" }}
                ></PhotoCameraBackOutlined>
                Thêm ảnh dịch vụ
                {/* <VisuallyHiddenInput type="file" /> */}
              </Button>
            </label>
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
            <FormControl sx={{ m: 1, minWidth: "30%" }}>
              <InputLabel id="demo-multiple-name-label">
                Chọn dịch vụ
              </InputLabel>
              <Select
                // defaultValue={shop.address?.province}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={service?.name}
                onChange={handleChangeService}
                input={<OutlinedInput label="Chon dich vu" />}
                MenuProps={MenuProps}
              >
                {services &&
                  services.map((s) => (
                    <MenuItem
                      key={s.id}
                      value={s.name}
                      // style={getStyles(name, personName, theme)}
                    >
                      {s.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <CssTextField
                multiline
                label="Mô tả"
                id="custom-css-outlined-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <CssTextField
                label="Giá thấp nhất"
                id="custom-css-outlined-input"
                value={lowestPrice}
                onChange={(e) => setLowestPrice(+e.target.value)}
              />
              <CssTextField
                label="Giá cao nhất"
                id="custom-css-outlined-input"
                value={highestPrice}
                onChange={(e) => setHighestPrice(+e.target.value)}
              />
            </FormControl>
            <Box
              display="flex"
              gap="1rem"
              justifyContent="flex-end"
              marginTop="1rem"
            >
              <Button
                variant="contained"
                sx={{ bgcolor: "#41b447", "&:hover": { bgcolor: "#3a9a3f" } }}
                onClick={handleAddButton}
              >
                Thêm dịch vụ
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
      }
    </Box>
  );
};

export default CreateNewService;
