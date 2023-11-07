import useTheme from "@/redux/hooks/useTheme";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn">
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
    </button>
  );
}

export default ThemeToggle;
