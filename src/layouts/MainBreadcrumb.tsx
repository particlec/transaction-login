import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MainBreadcrumb = () => {
  const location = useLocation();

  const BreadcrumbConfigure: Record<string, string> = {
    "/action/strategy": "strategy",
    "/action/TestSports": "sports",
  };

  return BreadcrumbConfigure[location.pathname] ? (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link to={location.pathname}>
          {BreadcrumbConfigure[location.pathname]}
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ) : null;
};
export default MainBreadcrumb;
