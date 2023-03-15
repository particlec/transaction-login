import styled from "styled-components";
import { Collapse } from "antd";
// import { Scrollbars } from "rc-scrollbars";
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
    name: "logicBegin",
    from: "0",
    remark: "术语转标准语句正则匹配规则",
    value: "获取自定义登录态",
    rect: { width: 100, height: 100 },
    fillStyle: "#ce0d0d",
    lineWidth: 2.5,
  };

  let start = {
    text: "开始",
    rect: {
      width: 45,
      height: 45,
    },
    name: "logicBegin",
    fillStyle: "#fff",
    data: {
      nodeElementId: "637de12a3a5a000012005526",
    },
  };

  let login = {
    text: "获取自定义登录态",
    rect: {
      width: 120,
      height: 60,
    },
    name: "term",
    image: "https://dev-pub-user.utcook.com/FjFn_bFg4UMmAo5SxsVQDioyzrot",
    data: {
      nodeElementId: "639293bf21e4350006c53aed",
    },
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
              onDragStart(e, JSON.stringify(start));
            }}
            title={"开始"}
          >
            <div className={"item-img"}>
              <img alt={"开始"} src={image} />
            </div>

            <div className={"item-title"}>开始</div>
          </div>
          <div
            className="item"
            key={"key12"}
            draggable
            onDragStart={(e) => {
              onDragStart(e, JSON.stringify(login));
            }}
            title={"获取自定义登录态"}
          >
            <img alt={"获取自定义登录态"} src={image} />
            获取自定义登录态
          </div>
          <></>
          <div
            className="item"
            key={"key13"}
            draggable
            onDragStart={(e) => {
              onDragStart(e, JSON.stringify(login));
            }}
            title={"获取自定义登录态"}
          >
            <img alt={"获取自定义登录态"} src={image} />
            获取自定义登录态
          </div>
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
  width: 250px;
  bottom: 0;
  background: white;
  z-index: 3;

  .ant-collapse-content-box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    .item {
      flex: 0 0 50%;
      flex-direction: row;
      display: flex;

      //word-break: break-all;
      //overflow: hidden;
      //text-overflow: ellipsis;
      //display: -webkit-box;
      //-webkit-line-clamp: 1;
      //-webkit-box-orient: vertical;
      //font-size: 12px;
      // 1结帐号cg、10050

      item-img {
        flex: 1;
        display: flex;
      }
      .item-title {
        flex: 2;
        display: flex;
      }
    }
  }
`;
