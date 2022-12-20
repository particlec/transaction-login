import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import BasicStrategy from "../views/strategyReservation/BasicStrategy";
import MenuLayout from "../layouts/MenuLayout";
import TestSports from "../views/strategyReservation/TestSports";

type KZRoute = {
  // 布局组件
  layout?: ReactNode | null;
  // 路由实际渲染的组件
  component?: ReactNode | null;
  // 路径
  path: string;
};

const CustomRouter: KZRoute[] = [
  {
    layout: <div></div>,
    component: <div></div>,
    path: "/plug-manage-user",
  },
  {
    layout: <MenuLayout />,
    component: <TestSports />,
    path: "/action/TestSports",
  },
  {
    layout: <MenuLayout />,
    component: <BasicStrategy />,
    path: "/action/strategy",
  },

  { component: <Navigate to="/action/strategy" />, path: "*" },
];

export default CustomRouter;