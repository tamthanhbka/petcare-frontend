import { Outlet } from "react-router-dom";
import "../styles/Auth.css";
function AuthLayout() {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
