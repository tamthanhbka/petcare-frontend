import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { getMe } from "../api";
type Role = "STAFF" | "USER" | "ADMIN";
export type User = {
  id: number;
  username: string;
  phone: string;
  isActivated: boolean;
  role: Role;
  email: string;
  fullName: string;
  followers: User[];
  createdAt: string;
  updatedAt: string;
  avatar: string;
};
type ContextPayloadType = {
  login: boolean;
  action: { login: (user: any) => any; logout: Function; update: Function };
  user?: User;
  loading: boolean;
};
const AuthContext = createContext<ContextPayloadType>({
  login: false,
  action: { login: () => {}, logout: () => {}, update: () => {} },
  loading: true,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<User>();
  const action = useMemo(
    () => ({
      login: (user: User) => {
        localStorage.setItem("user", JSON.stringify(user));
        setLogin(true);
        setUser(user);
      },
      logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setLogin(false);
        setUser(undefined);
      },
      update: () => {
        getMe()
          .then((data) => {
            action.login(data);
          })
          .catch(() => {
            action.logout();
          });
      },
    }),
    []
  );
  useLayoutEffect(() => {
    setLoading(false);
    const user = localStorage.getItem("user");
    if (!user) {
      return;
    }
    setLogin(true);
    setUser(JSON.parse(user));
    getMe()
      .then((data) => {
        action.login(data);
      })
      .catch(() => {
        action.logout();
      });
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ login, action, user, loading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
