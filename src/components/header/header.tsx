import { FC } from "react";
import { NavLink } from "react-router-dom";
import logo from "./../../img/logo1.svg";
import "./header.css";
import LoginButton from "../../helpers/loginbtn/loginBtn";
import { Link } from "react-router-dom";

const handleLogin = () => {
  alert("Login clicked!");
};

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-row">
          <Link
            to="/"
            className="logo-link"
          >
            <img
              src={logo}
              alt="logo"
              className="logo"
            />
          </Link>
          <p className="text-container">Silk Road</p>

          <LoginButton onLogin={handleLogin} />
        </div>
      </div>
    </header>
  );
};

export default Header;
