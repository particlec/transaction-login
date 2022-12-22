import React from "react";
import { Menu, MenuProps } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SideMenu = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem("strategyReservation", "sub1", <UserOutlined />, [
      getItem("Option 1", "/action/strategy"),
      getItem("Option 2", "/action/TestSports"),
      getItem("Option 3", "/action/Echarts"),
    ]),
    getItem("sportsStrategy", "sub2", <LaptopOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
    ]),
    getItem("riskAssessment", "sub4", <NotificationOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const onClick = (e: any) => {
    navigate(e.key);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
      onClick={onClick}
    />
  );
};
export default SideMenu;
