import React from "react";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "About",
    path: "/about",
    icon: <AiIcons.AiFillInfoCircle />,
    cName: "nav-text",
  },
  {
    title: "Albums",
    path: "/albums",
    icon: <AiIcons.AiFillPicture />,
    cName: "nav-text",
  },
  {
    title: "Todos",
    path: "/todos",
    icon: <AiIcons.AiFillCheckSquare />,
    cName: "nav-text",
  },
  {
    title: "Users",
    path: "/users",
    icon: <AiIcons.AiOutlineTeam />,
    cName: "nav-text",
  },
];

export default SidebarData;
