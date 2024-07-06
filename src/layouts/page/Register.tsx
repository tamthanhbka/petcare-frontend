import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError, signup } from "../../api";
import { useAuth } from "../../components/Auth";
import { signupValidate } from "../../validate";
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
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const { action, login } = useAuth();
  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login, navigate]);
  const handleSignup = async () => {
    try {
      const error = signupValidate(password, confirmPass);
      if (error) throw error;
      const data = await signup(email, phone, password, username);
      action.login(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          autoClose: 2000,
        });
      } else {
        toast.error(error as string, { autoClose: 2000 });
      }
    }
  };
  return (
    <div className="register-form" style={{ backgroundColor: "white" }}>
      <Typography
        sx={{ flex: 1, color: "#51b032", fontSize: 40 }}
        align="center"
        fontWeight={700}
        textTransform="uppercase"
      >
        Đăng ký
      </Typography>
      <Box
        display="block"
        sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 0.5 }}
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
          label="Số điện thoại"
          variant="standard"
          className="text-field"
          fullWidth
          required
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <CssTextField
          label="Tên hiển thị"
          variant="standard"
          className="text-field"
          fullWidth
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
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
        <CssTextField
          label="Xác nhận mật khẩu"
          variant="standard"
          type="password"
          className="text-field"
          fullWidth
          required
          value={confirmPass}
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
        />
      </Box>
      <Box sx={{ m: 2, flex: 1 }}>
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
          onClick={handleSignup}
        >
          Đăng ký
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
        <Typography sx={{ color: "black" }} variant="subtitle1" align="center">
          Bạn đã có tài khoản?{" "}
          <RLink style={{ color: "black" }} to="/login">
            Đăng nhập ngay
          </RLink>
        </Typography>
      </Box>
    </div>
  );
}
