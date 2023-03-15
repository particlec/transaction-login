import styled from "styled-components";
import util from "./utils";
import { Button } from "antd";

const { actions } = util;
const HeaderCanvas = ({
  commandExecutor,
  onClick,
}: {
  commandExecutor: any;
  onClick: any;
}) => {
  const save = () => {};

  return (
    <StyledDiv className={"header-div"}>
      <div className={"item-left"}>
        <div className="item" title="保存" onClick={save}>
          保存
        </div>
        <div
          className="item"
          title="放大"
          onClick={() => {
            commandExecutor(actions.zoomIn);
          }}
        >
          放大
        </div>
        <div
          className="item"
          title="缩小"
          onClick={() => {
            commandExecutor(actions.zoomOut);
          }}
        >
          缩小
        </div>
        <div
          className="item"
          title="撤销"
          onClick={() => {
            commandExecutor(actions.undo);
          }}
        >
          撤销
        </div>
        <div
          className="item"
          title="恢复"
          onClick={() => {
            commandExecutor(actions.redo);
          }}
        >
          恢复
        </div>
        <div
          className="item"
          title="删除"
          onClick={() => {
            commandExecutor(actions.delete);
          }}
        >
          删除
        </div>
      </div>

      <div className="item-right">
        <span className="time">上一次保存时间：20230315</span>

        <>
          <Button type="link" onClick={save}>
            保存
          </Button>
          <Button
            type="link"
            onClick={() => {
              console.log(1);
            }}
          >
            编译
          </Button>
          <Button
            type="link"
            onClick={() => {
              console.log(1);
            }}
          >
            历史编译
          </Button>
          <Button
            type="link"
            onClick={() => {
              console.log(1);
            }}
          >
            查看编译 TXT
          </Button>
        </>
      </div>
    </StyledDiv>
  );
};
export default HeaderCanvas;

const StyledDiv = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  height: 30px;

  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;

  background: #f8f8fa;
  display: flex;
  justify-content: space-between;

  .item-left {
    display: flex;
    justify-content: flex-start;
    .item {
      margin: 5px;
    }
  }

  .item-right {
    display: flex;
    justify-content: flex-end;
  }
`;
