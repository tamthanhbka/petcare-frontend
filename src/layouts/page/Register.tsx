import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError, signup } from "../../api";
import { useAuth } from "../../components/Auth";
import { signupValidate } from "../../validate";
const CssTextField = styled(TextField)({
  "& label, & label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiInput-underline": {
    borderBottomColor: "black",
  },
  "& .MuiInput-input": { color: "black" },
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
        variant="h2"
        sx={{ flex: 2, color: "#1877F2" }}
        align="center"
        fontWeight={900}
      >
        Register
      </Typography>
      <Box
        display="block"
        sx={{ flex: 2, display: "flex", flexDirection: "column" }}
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
          label="Phone Number"
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
          label="Username"
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
          label="Password"
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
          label="Confirm Password"
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
            backgroundColor: "#4b9bfc",
            backdropFilter: "blur(20px)",
            ":hover": {
              transition: "all 0.3s ease",
              backgroundColor: "#0068e8",
            },
          }}
          onClick={handleSignup}
        >
          Register
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
          Have an account?{" "}
          <RLink style={{ color: "black" }} to="/login">
            Login
          </RLink>
        </Typography>
      </Box>
    </div>
  );
}
