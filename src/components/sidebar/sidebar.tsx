import { FC, useState } from "react";
import "./sidebar.css";
import * as FeIcons from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarData from "./SidebarData";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";

const Sidebar: FC = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "var(--accent)" }}>
        <div className="sidebar">
          <Link
            to="#"
            className="menu-bars"
          >
            <FeIcons.FiMenu onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
          <ul
            className="nav-menu-items"
            onClick={showSidebar}
          >
            <li className="navbar-toggle">
              <Link
                to="#"
                className="menu-bars-x"
              >
                <FeIcons.FiX onClick={showSidebar} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li
                  key={index}
                  className={item.cName}
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
