import { FC, PropsWithChildren } from "react";
import { useAuth } from "../components/Auth";
import { Navigate } from "react-router-dom";
export interface ProtectedRouteProps extends PropsWithChildren {
  roles: ("STAFF" | "USER" | "ADMIN" | "GUEST")[];
}
const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const { children, roles = ["GUEST"] } = props;
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  const isAllow = roles.includes(user.role);
  //   if (!isAllow) return <Navigate to="/404" />;
  if (!isAllow) return <h1>404 NotFound!!!</h1>;
  return <>{children}</>;
};

export default ProtectedRoute;
