import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import MainBreadcrumb from "./MainBreadcrumb";

const { Header, Content, Sider } = Layout;
const MenuLayout = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
      </Header>
      <Layout>
        <Sider width={200}>
          <SideMenu />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <MainBreadcrumb />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MenuLayout;
