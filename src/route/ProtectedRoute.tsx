import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/Auth";
export interface ProtectedRouteProps extends Required<PropsWithChildren> {
  roles: ("staff" | "user" | "admin" | "guest")[];
}
const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const { children, roles = ["guest"] } = props;
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  const isAllow = roles.includes(user.role);
  //   if (!isAllow) return <Navigate to="/404" />;
  if (!isAllow) return <h1>404 NotFound!!!</h1>;
  return children;
};

export default ProtectedRoute;
