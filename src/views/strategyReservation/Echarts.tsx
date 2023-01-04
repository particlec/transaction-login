import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
  //width: 48px;
  //height: 48px;
  .s-Search {
    margin: 15px;
  }
`;

const Echarts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [params, setParams] = useState();

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

    // mockApi
    //   .getTest()
    //   .then((obj: any) => {
    //     console.log(obj);
    //     setData(obj);
    //   })
    //   .catch();
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

  let dataSource = [{ name: "hs300", remark: "test" }];

  const search = (name: string) => {
    setParams(Object.assign({}, params, { page: 1, name: name }));
  };

  const columns: ColumnsType<any> = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
      ellipsis: true,
      // render(text: string) {
      //   return text ? spliceLength(text, 10) : "";
      // },
    },
    {
      title: "操作",
      align: "left",
      key: "action",
      width: "250px",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            navigate("/action/Echarts/information");
            // setHistoryTableRow(record);
            // setOpenConfiguration(true);
          }}
        >
          详情
        </Button>
      ),
    },
  ];
  // 做帅选
  return (
    <StyledDiv>
      <div className={"s-Search"}>
        <Space direction="vertical">
          <Input.Search
            allowClear
            placeholder="请输入名称进行查询"
            onSearch={(value) => {
              search(value);
            }}
          />
        </Space>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </StyledDiv>
  );
};
export default Echarts;

// Ashare fuz\10
