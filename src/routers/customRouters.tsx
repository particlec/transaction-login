import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import BasicStrategy from "../views/strategyReservation/BasicStrategy";
import MenuLayout from "../layouts/MenuLayout";
import TestSports from "../views/strategyReservation/TestSports";
import Echarts from "../views/strategyReservation/Echarts";
import EchartImformation from "../views/strategyReservation/EchartImformation";
import TB from "../views/riskAssessment/TB";
import NewFunds from "../views/riskAssessment/NewFunds";

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
    layout: <MenuLayout />,
    component: <Echarts />,
    path: "/action/Echarts",
  },

  {
    layout: <MenuLayout />,
    component: <EchartImformation />,
    path: "/action/Echarts/information",
  },

  {
    layout: <MenuLayout />,
    component: <TestSports />,
    path: "/action/TestSports",
  },
  {
    layout: <MenuLayout />,
    component: <BasicStrategy />,
    path: "/action/Strategy",
  },

  {
    layout: <MenuLayout />,
    component: <TB />,
    path: "risk/TB",
  },

  {
    layout: <MenuLayout />,
    component: <NewFunds />,
    path: "risk/Funds",
  },
  { component: <Navigate to="/action/strategy" />, path: "*" },
];

export default CustomRouter;
