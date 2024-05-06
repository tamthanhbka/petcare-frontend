import { Search, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  FilledInput,
  Input,
  Modal,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import type { FC } from "react";

interface ListMessageProps {}

const ListMessage: FC<ListMessageProps> = () => {
  return (
    <Box padding={"2rem"}>
      <Paper elevation={2} sx={{ display: "flex", height: "90vh" }}>
        <Box flex={4} padding={"1rem"} borderRight="1px solid #dbdbdb">
          <OutlinedInput
            sx={{ ".MuiOutlinedInput-root": { borderRadius: "10px" } }}
            placeholder="Tìm kiếm"
            startAdornment={
              <Search sx={{ color: "#aaa", marginRight: "0.5rem" }}></Search>
            }
          ></OutlinedInput>
          <Box display={"flex"} marginTop={"1rem"}>
            <Avatar></Avatar>
            <Box
              marginLeft={"0.5rem"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography>Ten khach hang</Typography>
                <Typography>Thoi gian gui</Typography>
              </Box>
              <Typography>Noi dung tin nhan gan nhat</Typography>
            </Box>
          </Box>

          <Box display={"flex"} marginTop={"1rem"}>
            <Avatar></Avatar>
            <Box
              marginLeft={"0.5rem"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography>Ten khach hang</Typography>
                <Typography>Thoi gian gui</Typography>
              </Box>
              <Typography>Noi dung tin nhan gan nhat</Typography>
            </Box>
          </Box>

          <Box display={"flex"} marginTop={"1rem"}>
            <Avatar></Avatar>
            <Box
              marginLeft={"0.5rem"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography>Ten khach hang</Typography>
                <Typography>Thoi gian gui</Typography>
              </Box>
              <Typography>Noi dung tin nhan gan nhat</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          flex={10}
          bgcolor={"#F3F3F3"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            display={"flex"}
            bgcolor={"white"}
            padding={"0.5rem"}
            borderBottom="1px solid #dbdbdb"
            alignItems={"center"}
            gap={1}
          >
            <Avatar sx={{ width: 35, height: 35 }}></Avatar>
            <Typography>Ten khach hang</Typography>
          </Box>
          <Box
            padding={"1rem"}
            display={"flex"}
            gap={1}
            flexDirection={"column"}
            flex={1}
            justifyContent={"end"}
          >
            <Box
              bgcolor={"white"}
              width={"60%"}
              padding={"0.5rem"}
              borderRadius={"1rem"}
              boxShadow={"4px 4px 8px #e1e1e1"}
            >
              <Typography>Noi dung tin nhan gui di</Typography>
            </Box>
            <Box
              bgcolor={"#C6E3AD"}
              width={"60%"}
              padding={"0.5rem"}
              borderRadius={"1rem"}
              boxShadow={"4px 4px 8px #e1e1e1"}
              alignSelf={"flex-end"}
            >
              <Typography>Noi dung tin nhan gui den</Typography>
            </Box>
          </Box>
          <Box
            bgcolor={"white"}
            padding={"0.5rem 2rem"}
            borderTop="1px solid #dbdbdb"
          >
            <Input
              fullWidth
              disableUnderline
              placeholder="Nhập nội dung tin nhắn"
              endAdornment={<Send sx={{ color: "#F77E28" }}></Send>}
            ></Input>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ListMessage;
