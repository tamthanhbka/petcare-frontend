import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RLink, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError, login as loginAPI } from "../../api";
import { useAuth } from "../../components/Auth";
const CssTextField = styled(TextField)({
  "& label, & label.Mui-focused": {
    color: "#428f28",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#51b032",
  },
  "& .MuiInput-underline": {
    borderBottomColor: "#2d940a",
  },
  "& .MuiInput-input": { color: "#51b032" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "red",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const { action, login, user } = useAuth();
  useEffect(() => {
    if (!login || !user) return;
    if (user.role === "user") {
      const required = searchParam.get("required");
      if (required) navigate(-1);
      else navigate("/");
      return;
    }
    if (user.role === "staff") return navigate("/staff/dashboard");
    if (user.role === "admin") return navigate("/admin/dashboard");
  }, [login, navigate, searchParam, user]);
  useEffect(() => {
    const required = searchParam.get("required");
    if (required) toast.error("Vui lòng đăng nhập để sử dụng dịch vụ này");
  }, [searchParam]);
  const handleLogin = async () => {
    try {
      const data = await loginAPI(email, password);
      console.log(data);
      action.login(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          autoClose: 2000,
        });
      }
    }
  };
  return (
    <div className="login-form" style={{ backgroundColor: "white" }}>
      <Typography
        sx={{ flex: 2, color: "#51b032", fontSize: 40 }}
        align="center"
        fontWeight={700}
        textTransform="uppercase"
      >
        Đăng nhập
      </Typography>
      <Box
        display="block"
        sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <CssTextField
          label="Email"
          variant="standard"
          type="email"
          className="text-field"
          fullWidth
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <CssTextField
          label="Mật khẩu"
          variant="standard"
          type="password"
          className="text-field"
          fullWidth
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {/* <FormControlLabel
          control={<Checkbox />}
          label={<Typography sx={{ color: "black" }}>Remember me</Typography>}
        /> */}
      </Box>
      <Box sx={{ m: 1, flex: 1 }}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            backgroundColor: "#5ebd3e",
            backdropFilter: "blur(20px)",
            ":hover": {
              transition: "all 0.3s ease",
              backgroundColor: "#45a227",
            },
          }}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ color: "black" }} variant="body1" align="center">
          Bạn chưa có tài khoản?{" "}
          <RLink to="/register" style={{ color: "black" }}>
            Đăng kí ngay
          </RLink>
        </Typography>

        {/* <Typography variant="body1" align="center">
          <RLink to="/forgot-password" style={{ color: "black" }}>
            Forgot password?
          </RLink>
        </Typography> */}
      </Box>
    </div>
  );
}
