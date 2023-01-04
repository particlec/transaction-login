import React, { useMemo } from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const MainBreadcrumb = () => {
  const location = useLocation();

  const BreadcrumbConfigure: Record<string, any> = {
    "/action/strategy": "strategy",
    "/action/TestSports": "sports",
    "/action/Echarts": "table",
    "/action/Echarts/information": [
      { table: "/action/Echarts" },
      { echarts: "/action/Echarts/information" },
    ],
  };

  const breadcrumbName = BreadcrumbConfigure[location.pathname];

  const breadcrumbStyled = useMemo(() => {
    if (breadcrumbName) {
      if (Array.isArray(breadcrumbName)) {
        return (
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbName.map((obj: any, index: number) => {
              return (
                <Breadcrumb.Item key={index}>
                  <Link to={Object.values(obj)[0] || breadcrumbName}>
                    {Object.keys(obj)[0]}
                  </Link>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        );
      } else {
        return (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to={location.pathname}>{breadcrumbName}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        );
      }
    } else {
      return null;
    }
  }, [breadcrumbName, location.pathname]);

  return breadcrumbStyled;
};
export default MainBreadcrumb;
