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
import { UserType } from "../type";
type ContextPayloadType = {
  login: boolean;
  action: {
    login: (user: UserType) => void;
    logout: () => void;
    update: () => void;
  };
  user?: UserType;
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
  const [user, setUser] = useState<UserType>();
  const action = useMemo(
    () => ({
      login: (user: UserType) => {
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
  }, [action]);
  return (
    <>
      <AuthContext.Provider value={{ login, action, user, loading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
