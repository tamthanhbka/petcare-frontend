import { Outlet } from "react-router-dom";
import "../styles/Auth.css";
import { useEffect } from "react";
function AuthLayout() {
  useEffect(() => {
    const rasa = document.getElementById("rasa-chat-widget-container");
    if (!rasa) return;
    rasa.style.display = "none";
    return () => {
      rasa.style.display = "block";
    };
  }, []);
  return (
    <div className="auth-container" style={{ backgroundColor: "#d2edd2" }}>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
