import {
  drawNodeFns,
  iconRectFns,
  rectangle,
  registerNode,
  textRectFns,
} from "@topology/core";
import BottomAnchor from "./anchors/BottomAnchor";
import UpAnchor from "./anchors/UpAnchor";
import UpBottomAnchor from "./anchors/UpBottomAnchor";
import DoubleCircle from "./nodes/DoubleCircle";
import SubProcess from "./nodes/SubProcess";
import Term from "./nodes/Term";

export const nodeNames = {
  // 开始
  begin: "logicBegin",
  // 结束
  end: "logicEnd",
  // 执行
  execute: "logicExecute",
  // 事件
  event: "logicEvent",
  // 子流程
  subProcess: "logicSubProcess",
  // 条件分支
  conditional: "logicConditional",
  // 分支线
  conditionalLine: "logicConditionalLine",
  // 术语
  term: "term",
};

export function register() {
  // 开始
  registerNode(nodeNames.begin, drawNodeFns.circle, BottomAnchor.anchorsFn);

  // 结束
  registerNode(nodeNames.end, drawNodeFns.circle, UpAnchor.anchorsFn);

  // 执行动作
  registerNode(
    nodeNames.execute,
    rectangle,
    UpBottomAnchor.anchorsFn,
    iconRectFns["rectangle"],
    textRectFns["rectangle"]
  );

  // 事件
  registerNode(
    nodeNames.event,
    DoubleCircle.drawFn,
    UpBottomAnchor.anchorsFn,
    iconRectFns["rectangle"],
    textRectFns["rectangle"]
  );

  // 子流程
  registerNode(
    nodeNames.subProcess,
    SubProcess.drawFn,
    UpBottomAnchor.anchorsFn
  );

  // 条件分支
  registerNode(
    nodeNames.conditional,
    drawNodeFns["diamond"],
    undefined,
    undefined,
    textRectFns["rectangle"]
  );

  // 术语
  registerNode(
    nodeNames.term,
    Term.drawFn,
    UpBottomAnchor.anchorsFn,
    undefined,
    undefined
  );
}
