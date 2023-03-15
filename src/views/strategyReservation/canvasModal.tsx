import styled from "styled-components";
import { Modal } from "antd";
import TopologyContext from "../topologyCanvas/TopologyContext";
import HeaderCanvas from "../topologyCanvas/headerCanvas";
import ToolsPanel from "../topologyCanvas/toolsPanel";
import React, {
  CSSProperties,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Topology } from "@topology/core";
import UtCanvas from "../topologyCanvas/UtCanvas";
import util from "./../topologyCanvas/utils";

const CanvasModal = () => {
  const [isContextMenuShow, setIsContextMenuShow] = useState(false);

  const [contextMenuStyle, setContextMenuStyle] = useState<CSSProperties>({
    display: "none",
  });

  const topologyRef = useRef<Topology>();
  const utCanvasRef = useRef<UtCanvas>();

  const commandExecutor = util.getCommandExecutor(topologyRef);

  useEffect(() => {
    // id topology 的当作背景了
    const utCanvas = new UtCanvas("topology");
    const topology = utCanvas.instance;
    utCanvasRef.current = utCanvas;
    topologyRef.current = topology;
    // // window.a = topology;
    //
    // @ts-ignore
    // @ts-ignore
    topology.open(null);
    topology.render();
  }, []);

  const onContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.clientY + 360 < document.body.clientHeight) {
      setContextMenuStyle({
        left: event.clientX + "px",
        top: event.clientY + "px",
      });
    } else {
      setContextMenuStyle({
        left: event.clientX + "px",
        bottom: "5px",
      });
    }
    setIsContextMenuShow(true);
  };

  return (
    <ModalStyle
      open
      maskClosable={false}
      title="流程图编辑"
      width="800px"
      // onCancel={props.onCancel}
      // onOk={onOk}
    >
      <TopologyContext.Provider
        value={{
          topology: topologyRef.current,
          utCanvas: utCanvasRef.current,
        }}
      >
        <HeaderCanvas
          commandExecutor={commandExecutor}
          onClick={() => {
            console.log(1);
          }}
        />
        <ToolsPanel />

        <div className="canvas-panel" onContextMenu={onContextMenu}>
          <div
            className="topology"
            id="topology"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </TopologyContext.Provider>
    </ModalStyle>
  );
};
export default CanvasModal;

const ModalStyle = styled(Modal)`
  .canvas-panel {
    top: 60px;
    width: 100%;
    height: 600px;
    position: relative;
      linear-gradient(rgba(241, 243, 244, 1) 10%, transparent 0);
    background-size: 10px 10px;
  }
`;
