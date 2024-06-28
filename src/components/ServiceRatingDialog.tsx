import { Pets, PetsOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Rating,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState, type FC } from "react";
import { ShopServiceType } from "../type";
import shopServiceApi from "../api/shopService";
import { toast } from "react-toastify";
export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#82C55B",
  },
  "& .MuiRating-iconHover": {
    color: "#7bbe54",
  },
});

interface ServiceRatingDialogProps extends DialogProps {
  onClose: () => void;
  shopService: ShopServiceType;
}

const ServiceRatingDialog: FC<ServiceRatingDialogProps> = (props) => {
  const { shopService, ...rest } = props;
  const { service } = shopService;
  const [content, setContent] = useState<string>();
  const [value, setValue] = useState<number>();
  const handleRating = async () => {
    if (!content || !value || !shopService.id) return;
    await shopServiceApi.rating({
      content,
      shopServiceId: shopService.id,
      value,
    });
    toast.success("Đánh giá thành công");
    setContent(undefined);
    setValue(undefined);
    rest.onClose();
  };
  return (
    <Dialog {...rest} maxWidth="lg">
      <DialogTitle fontWeight="600">
        Đánh giá dịch vụ {service.name}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography fontSize={20}>
          "Mọi ý kiến của khách hàng luôn được chúng tôi ghi nhận và trân trọng
          để từ đó ngày càng hoàn thiện hơn."
        </Typography>
        <Typography sx={{ alignSelf: "start" }} fontSize={18}>
          Hãy để lại đánh giá của bạn
        </Typography>
        <StyledRating
          value={value}
          sx={{ alignSelf: "start" }}
          name="customized-color"
          defaultValue={5}
          precision={1}
          icon={<Pets fontSize="inherit" />}
          emptyIcon={<PetsOutlined fontSize="inherit" />}
          onChange={(_, value) => {
            setValue(value ?? 0);
          }}
        />
        <TextField
          value={content}
          rows={3}
          multiline
          label="Đánh giá của bạn"
          id="Đánh giá của bạn"
          placeholder="Nhập đánh giá"
          sx={{
            ".MuiInputBase-root": { borderRadius: 6 },
          }}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          sx={{
            marginTop: 1,
            bgcolor: "#ED6436",
            color: "white",
            "&:hover": { bgcolor: "#ED6436" },
            fontSize: 20,
            textTransform: "initial",
            alignSelf: "end",
          }}
          disabled={!content || !value}
          onClick={handleRating}
        >
          Đánh giá
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceRatingDialog;
