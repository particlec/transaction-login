import styled from "styled-components";

const HeaderCanvas = () => {
  const save = () => {};

  const undo = () => {};

  const redo = () => {};

  return (
    <StyledDiv className={"header-div"}>
      <div className="item" title="保存" onClick={save}>
        保存
      </div>
      <div className="item" title="撤销" onClick={undo}>
        撤销
      </div>
      <div className="item" title="恢复" onClick={redo}>
        恢复
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
  justify-content: space-around;
`;
