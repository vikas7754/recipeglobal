import { useDispatch, useSelector } from "react-redux";
import { login } from "../states/user";

const useUser = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const loginFn = (user) => {
    dispatch(login(user));
  };

  const logoutFn = () => {
    dispatch(logout());
  };

  return {
    isLoggedIn,
    user,
    login: loginFn,
    logout: logoutFn,
  };
};

export default useUser;
