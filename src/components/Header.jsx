import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { FaCircleHalfStroke } from "react-icons/fa6";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <header className="header">
        <nav className="nav">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <Link to="/">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </Link>
          <FaCircleHalfStroke
            className={`pointer ${theme === "dark" ? "white" : "dark"}`}
            onClick={toggleTheme}
          />
          <Link to="/">Home</Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
