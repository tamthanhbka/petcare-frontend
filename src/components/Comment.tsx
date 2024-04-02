import { Avatar, Badge, Box, Typography } from "@mui/material";
import type { FC } from "react";
import { StyledRating } from "../layouts/ShopDetail";
import { Pets, PetsOutlined } from "@mui/icons-material";

interface CommentItemProps {}

const CommentItem: FC<CommentItemProps> = () => {
  return (
    <Box
      display="flex"
      alignItems="start"
      sx={
        {
          // border: "1px dotted #C5C5C5",
          // padding: "60px 20px 16px 20px",
          // // backgroundImage: `url("${bg}")`,
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          // backgroundSize: "cover",
        }
      }
    >
      <Box flex={3}>
        <Avatar
          sx={{ width: 130, height: 130 }}
          alt="Travis Howard"
          src="https://tropicpet.vn/wp-content/uploads/2022/05/khach-hang-linh-chi-140x140.jpg"
        />
        {/* <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Avatar
              sx={{ width: 70, height: 70, border: "4px solid white" }}
              alt="Remy Sharp"
              src="https://tropicpet.vn/wp-content/uploads/2022/05/pet-com-82x82.jpg"
            />
          }
        >
          
        </Badge> */}
      </Box>
      <Box flex={9}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 1,
            color: "#82C55B",
          }}
        >
          Chị Thu Hà
        </Typography>
        {/* <Typography sx={{ fontSize: 18, fontWeight: 600, marginBottom: 1 }}>
          Pet: Bé Cốm
        </Typography> */}
        <Typography>
          Dịch vụ của bên mình rất chu đáo, các bác sĩ tư vấn cho mình kỹ càng.
          Giá cả phù hợp, mình sẽ tiếp tục sử dụng dịch vụ của bệnh viện.
        </Typography>
        <StyledRating
          sx={{ marginTop: 1 }}
          name="customized-color"
          defaultValue={2}
          readOnly
          precision={1}
          icon={<Pets fontSize="inherit" />}
          emptyIcon={<PetsOutlined fontSize="inherit" />}
        />
      </Box>
    </Box>
  );
};

export default CommentItem;
