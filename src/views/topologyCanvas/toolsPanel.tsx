import styled from "styled-components";
import { Collapse } from "antd";
// import Scrollbars from "rc-scrollbars";
import action from "./../../assets/topology/action.png";
import React, { useCallback } from "react";

const { Panel } = Collapse;
const image = action;

const ToolsPanel = () => {
  const onDragStart = useCallback(
    (e: React.DragEvent<HTMLSpanElement>, data: string) => {
      e.dataTransfer?.setData("Topology", data);
    },
    []
  );

  let test = {
    identifier: "logicRegularMatch",
    dataType: {
      type: "string",
      spec: {},
    },
    name: "rectangle",
    from: "0",
    remark: "术语转标准语句正则匹配规则",
    value: "获取自定义登录态",
    rect: { width: 100, height: 100 },
  };

  // 固定，就头部 右边收缩
  return (
    <StyledDiv>
      <div>工具栏</div>
      {/*<Scrollbars>*/}
      <Collapse defaultActiveKey={["default", "term", "func", "database"]}>
        <Panel key={"key1"} header={"流程图"}>
          <div
            className="item"
            key={"key11"}
            draggable
            onDragStart={(e) => {
              onDragStart(e, JSON.stringify(test));
            }}
            title={"开始"}
          >
            <img alt={"开始"} src={image} />
            {/*{"开始"}*/}
          </div>
          <div
            className="item"
            key={"key12"}
            draggable
            onDragStart={(e) => {
              // onDragStart(e, JSON.stringify(item.data));
            }}
            title={"结束"}
          >
            <img alt={"结束"} src={image} />
            {/*{"开始"}*/}
          </div>
          <div
            className="item"
            key={"key13"}
            draggable
            onDragStart={(e) => {
              // onDragStart(e, JSON.stringify(item.data));
            }}
            title={"逻辑"}
          >
            <img alt={"逻辑"} src={image} />
            {/*{"开始"}*/}
          </div>

          <div></div>
        </Panel>
      </Collapse>
      {/*</Scrollbars>*/}
    </StyledDiv>
  );
};

export default ToolsPanel;

const StyledDiv = styled.div`
  position: absolute;
  top: 106px;
  left: 0;
  width: 220px;
  bottom: 0;
  background: white;
  z-index: 3;

  .ant-collapse-content-box {
    display: flex;
    flex-wrap: wrap;

    .item {
      flex: 0 0 50%;
    }
  }
`;
