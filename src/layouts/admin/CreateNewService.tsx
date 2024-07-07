import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useState, type FC } from "react";
import { ServiceType } from "../../type";
import { createService } from "../../api/admin";
import { toast } from "react-toastify";
// export const StyledRating = styled(Rating)({
//   "& .MuiRating-iconFilled": {
//     color: "#82C55B",
//   },
//   "& .MuiRating-iconHover": {
//     color: "#7bbe54",
//   },
// });

interface CreateNewServiceDialogProps extends DialogProps {
  onClose: () => void;
  parentServices: ServiceType[];
  refetch: () => void;
}

const CreateNewService: FC<CreateNewServiceDialogProps> = (props) => {
  const { parentServices, ...rest } = props;
  const [parent, setParent] = useState("");
  const [name, setName] = useState("");
  //   const handleRating = async () => {
  //     if (!content || !value || !shopService.id) return;
  //     await shopServiceApi.rating({
  //       content,
  //       shopServiceId: shopService.id,
  //       value,
  //     });
  //     toast.success("Đánh giá thành công");
  //     setContent(undefined);
  //     setValue(undefined);
  //     rest.onClose();
  //   };

  const handleCreateService = async () => {
    if (parent && name) {
      const parentSV = parentServices.find((pv) => pv.name.includes(parent));
      parentSV && (await createService(name, parentSV?.id));
      toast.success("Tạo dịch vụ thành công!");
      setName("");
      setParent("");
      rest.refetch();
      rest.onClose();
    }
  };
  return (
    <Dialog {...rest} maxWidth="lg">
      <DialogTitle fontWeight="600" sx={{ color: "#ec8319" }}>
        Tạo dịch vụ mới
      </DialogTitle>
      <Box>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl size="medium" fullWidth>
            <InputLabel id="demo-simple-select-label">Loại dịch vụ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={parent}
              label="Loại dịch vụ"
              onChange={(e) => setParent(e.target.value)}
              defaultValue={""}
            >
              {parentServices.map((sp) => (
                <MenuItem key={sp.id} value={sp.name}>
                  {sp.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <OutlinedInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            placeholder="Nhập tên dịch vụ"
            size="medium"
            // sx={{
            //   "&.MuiOutlinedInput-root": {
            //     "& fieldset": {
            //       borderColor: "#c7c7c7",
            //     },
            //     "&:hover fieldset": {
            //       borderColor: "#adadad",
            //     },
            //     "&.Mui-focused fieldset": {
            //       borderColor: "#e49749",
            //     },
            //   },
            // }}
          ></OutlinedInput>
        </DialogContent>
      </Box>
      <DialogActions
        sx={{
          p: "0 10px 15px 10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          size="small"
          variant="contained"
          sx={{
            marginTop: 1,
            bgcolor: "#F9993A",
            color: "white",
            "&:hover": { bgcolor: "#ec8319" },
            fontSize: 14,
            textTransform: "initial",
          }}
          disabled={!parent || !name}
          onClick={handleCreateService}
        >
          Tạo dịch vụ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewService;
