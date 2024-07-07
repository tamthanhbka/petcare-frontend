import { ArrowBack, CloudUpload, Pets } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getShopServiceByStaff,
  updateShopServiceByStaff,
  uploadImg,
} from "../../api";
import { ServiceShopType } from "../../type";
const Image = styled("img")({});

interface ReadServiceProps {}

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
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

const ReadService: FC<ReadServiceProps> = () => {
  const navigation = useNavigate();
  const { id } = useParams() as { id: string };
  const [img, setImg] = useState<File>();
  const [shopService, setShopService] = useState<ServiceShopType>();
  const { data } = useQuery<ServiceShopType>({
    queryKey: [`service${id}`],
    queryFn: () => getShopServiceByStaff(id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setShopService(data);
    }
  }, [data]);
  const handleUpdateButton = async () => {
    if (shopService) {
      const image = img ? await uploadImg(img) : shopService?.image;
      updateShopServiceByStaff(id, { ...shopService, image }).then(() =>
        toast.success("Cập nhật thông tin thành công!")
      );
    }
  };

  return (
    <Box padding={"2rem"} height="100vh">
      {shopService && (
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
            // position="relative"
          >
            <Image
              sx={{
                width: "400px",
                height: "260px",
                borderRadius: "1rem",
                border: "1px solid #d1d1d1",
                objectFit: "cover",
              }}
              src={
                shopService?.image
                  ? shopService.image
                  : "https://thanhcongfarm.com/wp-content/uploads/2022/10/320456_best_dog_spa_0.jpg"
              }
            ></Image>
            <Box
              display="flex"
              position="absolute"
              bottom={"23%"}
              left={10}
              gap={0.3}
              bgcolor="#fff4eb"
              width="3.5rem"
              height="3.5rem"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
              border="2px solid #EF7F2D"
            >
              <Typography sx={{ color: "#e76609", fontWeight: "500" }}>
                {+(shopService.rating || 0).toFixed(2)}
              </Typography>
              <Pets fontSize="small" sx={{ color: "#EF7F2D" }} />
            </Box>

            <Button
              color="success"
              // role={undefined}
              variant="outlined"
              // tabIndex={-1}
              startIcon={<CloudUpload />}
              sx={{ width: "45%", textTransform: "initial" }}
            >
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
                    setShopService({
                      ...shopService,
                      image: v.target?.result?.toString() || shopService.image,
                    });
                  };
                  reader.readAsDataURL(img);
                }}
              />
            </Button>
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
                label="Tên dịch vụ"
                id="custom-css-outlined-input"
                value={shopService?.service.name}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <CssTextField
                label="Loại dịch vụ"
                id="custom-css-outlined-input"
                value={shopService?.service.parent.name}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <CssTextField
                multiline
                label="Mô tả"
                id="custom-css-outlined-input"
                value={shopService?.description}
                onChange={(e) =>
                  setShopService({
                    ...shopService,
                    description: e.target.value,
                  })
                }
              />
              <CssTextField
                label="Giá thấp nhất"
                id="custom-css-outlined-input"
                value={shopService?.lowestPrice}
                onChange={(e) =>
                  setShopService({
                    ...shopService,
                    lowestPrice: +e.target.value,
                  })
                }
              />
              <CssTextField
                label="Giá cao nhất"
                id="custom-css-outlined-input"
                value={shopService?.highestPrice}
                onChange={(e) =>
                  setShopService({
                    ...shopService,
                    highestPrice: +e.target.value,
                  })
                }
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

export default ReadService;
