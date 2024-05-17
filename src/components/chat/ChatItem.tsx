import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import type { FC } from "react";

interface ChatItemProps {
  name: string;
  createdAt: string;
  lastMessage: string;
  avatar?: string;
  active?: boolean;
  onClick?: () => void;
}

const ChatItem: FC<ChatItemProps> = (props) => {
  const { name, avatar, lastMessage, active, createdAt, onClick } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      p="0.5rem"
      borderRadius=".4rem"
      bgcolor={active ? "#e6e4e4" : "#f9f9f9"}
      sx={{
        "&:hover": {
          bgcolor: active ? undefined : "#efefef",
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      <Tooltip title={name}>
        <Avatar src={avatar}>
          {avatar ? null : name.at(0)?.toUpperCase()}
        </Avatar>
      </Tooltip>
      <Box
        marginLeft="0.5rem"
        width="100%"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Box display="flex" flexDirection="column">
          <Typography
            fontSize={14}
            fontWeight="bold"
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {name}
          </Typography>
          <Box display="flex" gap={1} alignItems="baseline">
            <Typography
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                fontSize: 12,
                flex: 1,
              }}
            >
              {lastMessage}
            </Typography>
            <Typography fontSize={9}>{getDiff(createdAt)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const getDiff = (createdAt: string) => {
  const date = new Date(createdAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  let html: JSX.Element;
  if (diff < 1000 * 60) {
    html = <>Vừa xong</>;
  } else if (diff < 1000 * 60 * 60) {
    html = <>{Math.floor(diff / (1000 * 60))} phút trước</>;
  } else if (diff < 1000 * 60 * 60 * 24) {
    html = <>{Math.floor(diff / (1000 * 60 * 60))} giờ trước</>;
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    html = <>{Math.floor(diff / (1000 * 60 * 60 * 24))} ngày trước</>;
  } else html = <>{date.toLocaleString()}</>;
  return html;
};
export default ChatItem;
