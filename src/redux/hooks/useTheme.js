import { toggleTheme } from "../states/theme";
const { useDispatch, useSelector } = require("react-redux");

const useTheme = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const setTheme = () => dispatch(toggleTheme());
  return { isDark, toggleTheme: setTheme };
};

export default useTheme;
