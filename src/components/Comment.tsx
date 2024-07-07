import { Pets, PetsOutlined } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import type { FC } from "react";
import { StyledRating } from "../layouts/ShopDetail";
import { CommentType } from "../type";

interface CommentItemProps extends CommentType {}

const CommentItem: FC<CommentItemProps> = (props) => {
  const { user, content, value } = props;
  return (
    <Box display="flex" alignItems="start" gap={2}>
      <Box flex={3}>
        <Avatar
          sx={{ width: 130, height: 130 }}
          alt="Travis Howard"
          src={user.avatar}
        >
          {user.avatar ? null : user.fullName.at(0)?.toUpperCase()}
        </Avatar>
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
          {user.fullName}
        </Typography>
        <Typography>{content}</Typography>
        <StyledRating
          value={value}
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
