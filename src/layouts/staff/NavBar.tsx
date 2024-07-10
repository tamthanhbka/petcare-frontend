import {
  ContactEmergency,
  HomeRepairService,
  MedicalInformation,
  RecentActors,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Badge,
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
  styled,
} from "@mui/material";
import { type FC } from "react";

import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { useAuth } from "../../components/Auth";
import { useQuery } from "@tanstack/react-query";
import { getShopByStaff } from "../../api";
import { ShopType } from "../../type";
interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const { action, user } = useAuth();
  // const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const handleLogout = () => {
    action.logout();
  };

  const { data: shop } = useQuery<ShopType>({
    queryKey: [`shop`],
    queryFn: () => getShopByStaff(),
    refetchOnWindowFocus: false,
  });
  // const handleToggleSettings = (e: any) => {
  //   if (e) {
  //     setAnchorElUser((prv) => (prv ? null : e.currentTarget));
  //     return;
  //   }
  // };
  return (
    <Box
      sx={{
        padding: "1rem",
        bgcolor: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <img height="80px" alt="Petcare" src={logo}></img>
        <Typography
          fontFamily="sans-serif"
          color="#EF7F2D"
          fontSize={20}
          marginBottom={"1rem"}
          fontWeight={700}
        >
          {shop?.name}
        </Typography>
      </Box>

      <MenuList
        sx={{
          flex: 1,
          display: "flex",
          gap: 1,
          flexDirection: "column",
        }}
      >
        {/* <NavLink to="dashboard">
          <MenuItem
            sx={{
              borderRadius: "1.5rem",
              "&:hover": { bgcolor: "#CEE7B9" },
              "&.Mui-focusVisible": {
                backgroundImage:
                  "linear-gradient(90deg,#f4f9ef 0%, #7EC247 100%)",
                color: "black",
              },
            }}
          >
            <ListItemIcon>
              <Dashboard fontSize="medium" sx={{ color: "#6ab62c" }} />
            </ListItemIcon>
            <ListItemText>DashBoards</ListItemText>
          </MenuItem>
        </NavLink> */}

        {/* <Divider /> */}
        <NavLink to="shop">
          <MenuItem
            sx={{ borderRadius: "1.5rem", "&:hover": { bgcolor: "#CEE7B9" } }}
          >
            <ListItemIcon>
              <ContactEmergency fontSize="medium" sx={{ color: "#6ab62c" }} />
            </ListItemIcon>
            <ListItemText>Thông tin shop</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink to="services">
          <MenuItem
            sx={{ borderRadius: "1.5rem", "&:hover": { bgcolor: "#CEE7B9" } }}
          >
            <ListItemIcon>
              <HomeRepairService fontSize="medium" sx={{ color: "#6ab62c" }} />
            </ListItemIcon>
            <ListItemText>Quản lý dịch vụ</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink to="bookings">
          <MenuItem
            sx={{ borderRadius: "1.5rem", "&:hover": { bgcolor: "#CEE7B9" } }}
          >
            <ListItemIcon>
              <MedicalInformation fontSize="medium" sx={{ color: "#6ab62c" }} />
            </ListItemIcon>
            <ListItemText>Quản lý yêu cầu đặt dịch vụ</ListItemText>
          </MenuItem>
        </NavLink>

        <NavLink to="chats">
          <MenuItem
            sx={{ borderRadius: "1.5rem", "&:hover": { bgcolor: "#CEE7B9" } }}
          >
            <ListItemIcon>
              <RecentActors fontSize="medium" sx={{ color: "#6ab62c" }} />
            </ListItemIcon>
            <ListItemText>Tin nhắn</ListItemText>
          </MenuItem>
        </NavLink>
      </MenuList>
      <Box display="flex" gap={1.5}>
        <Box>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            // onClick={handleToggleSettings}
          >
            <Avatar sx={{ width: 50, height: 50 }} />
            {/* <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu> */}
          </StyledBadge>
        </Box>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography>{user?.fullName}</Typography>
          <Typography>{user?.email}</Typography>
        </Box>
        <Box display="grid" sx={{ placeItems: "center" }}>
          <LogoutIcon
            sx={{
              cursor: "pointer",
              transition: "all .2s ease-out",
              "&:hover": {
                color: "rgba(255, 49, 49, 1)",
                transform: "scale(1.1)",
              },
            }}
            onClick={handleLogout}
          />
        </Box>
      </Box>
    </Box>
  );
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
export default NavBar;
