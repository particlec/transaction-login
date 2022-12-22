import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/plots";
import mockApi from "../../apis/mockApi";

const Echarts = () => {
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });

    mockApi
      .getTest()
      .then((obj: any) => {
        console.log(obj);
        setData(obj);
      })
      .catch();
  };
  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    xAxis: {
      type: "time",
    },
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };

  return <Line {...config} />;
};
export default Echarts;

// Ashare fuz\10
