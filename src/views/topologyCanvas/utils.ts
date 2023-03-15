import { Line, Lock, Node, Pen, PenType, Topology } from "@topology/core";
import { alignNodes } from "@topology/layout";
import { MutableRefObject } from "react";

type UtNode = {
  id: number | string;
  nodeId: string;
  name: string;
  prev: {
    id: number | string;
    anchorId: number;
  }[];
  next: {
    id: number | string;
    anchorId: number;
  }[];
};

const strip = (num: number, precision = 12) => {
  return +parseFloat(num.toPrecision(precision));
};

const actions = {
  align: "align",
  bottom: "bottom",
  copy: "copy",
  cut: "cut",
  delete: "delete",
  down: "down",
  duplicate: "duplicate",
  exportJson: "exportJson",
  exportPng: "exportPng",
  paste: "paste",
  top: "top",
  redo: "redo",
  undo: "undo",
  up: "up",
  zoomIn: "zoomIn",
  zoomOut: "zoomOut",
  zoomTo: "zoomTo",
};

/**
 * 获取画布命令执行器
 *
 * @param ref 画布的引用实例
 */
const getCommandExecutor = (ref: MutableRefObject<Topology | undefined>) => {
  return (command: string, data?: number | string) => {
    const instance = ref.current;
    if (instance) {
      const instanceScale = instance.data.scale;
      switch (command) {
        // 撤销
        case actions.undo:
          instance.undo();
          break;
        // 恢复
        case actions.redo:
          instance.redo();
          break;
        // 剪切
        case actions.cut:
          instance.cut();
          break;
        // 复制
        case actions.copy:
          instance.copy();
          break;
        // 粘贴
        case actions.paste:
          instance.paste();
          break;
        // 创建副本
        case actions.duplicate:
          instance.copy();
          instance.paste();
          break;
        // 删除
        case actions.delete:
          instance.delete();
          break;
        // 放大
        case actions.zoomIn:
          if (strip(instanceScale) < 1.5) {
            instance.scaleTo(strip(instanceScale + 0.1));
          }
          break;
        // 缩小
        case actions.zoomOut:
          if (strip(instanceScale) > 0.5) {
            instance.scaleTo(strip(instanceScale - 0.1));
          }
          break;
        // 缩放到
        case actions.zoomTo:
          if (data) {
            if (strip(data as number) >= 0.5 && strip(data as number) <= 1.5) {
              instance.scaleTo(strip(data as number));
            }
          }
          break;
        // 上移一层
        case actions.up:
          if (instance.activeLayer.pens.length > 0) {
            for (const pen of instance.activeLayer.pens) {
              instance.up(pen);
            }
            instance.render();
          }
          break;
        // 下移一层
        case actions.down:
          if (instance.activeLayer.pens.length > 0) {
            for (const pen of instance.activeLayer.pens) {
              instance.down(pen);
            }
            instance.render();
          }
          break;
        // 置顶
        case actions.top:
          if (instance.activeLayer.pens.length > 0) {
            for (const pen of instance.activeLayer.pens) {
              instance.top(pen);
            }
            instance.render();
          }
          break;
        // 置底
        case actions.bottom:
          if (instance.activeLayer.pens.length > 0) {
            for (const pen of instance.activeLayer.pens) {
              instance.bottom(pen);
            }
            instance.render();
          }
          break;
        // 对齐
        case "align":
          alignNodes(
            instance.activeLayer.pens,
            instance.activeLayer.rect,
            data as string
          );
          instance.updateProps();
          break;

        // 组合
        case "combine":
          if (instance.activeLayer.pens.length > 0) {
            instance.combine(instance.activeLayer.pens);
            instance.render();
          }
          break;
        // 取消组合
        case "uncombine":
          if (instance.activeLayer.pens.length === 1) {
            instance.uncombine(instance.activeLayer.pens[0]);
            instance.render();

            // 取消组合后，手动发送点击空白处事件
            instance.dispatch("space");
          }
          break;
        // 锁定/解锁
        case "lock":
          instance.lock(instance.data.locked ? Lock.None : Lock.Readonly);
          instance.render();
          break;
        case "exportPng":
          instance.saveAsImage();
          break;
      }
    }
  };
};

/**
 * 生成节点关联关系
 *
 * @param instance
 */
const generateAssociation = (instance: Topology | undefined) => {
  if (!instance) {
    return {
      chartData: {
        flowChartId: "",
      },
      nodes: [],
    };
  } else {
    const pens = instance.data.pens;
    const linePens = pens.filter(
      (item: Pen) => item.type === PenType.Line
    ) as Line[];
    const nodePens = pens.filter(
      (item: Pen) => item.type === PenType.Node
    ) as Node[];

    const nodes: UtNode[] = [];

    linePens.forEach((item) => {
      const from = item.from;
      const to = item.to;

      const fromIndex = nodes.findIndex((item) => item.id === from.id);
      if (fromIndex === -1) {
        const _fn = nodePens.find((item) => item.id === from.id);
        nodes.push({
          id: from.id,
          nodeId: _fn?.data.nodeId,
          name: _fn?.name || "",
          prev: [],
          next: [
            {
              id: to.id,
              anchorId: to.anchorIndex,
            },
          ],
        });
      } else {
        const fromNode = nodes[fromIndex];
        fromNode.next.push({
          id: to.id,
          anchorId: to.anchorIndex,
        });
        nodes.splice(fromIndex, 1, fromNode);
      }

      const toIndex = nodes.findIndex((item) => item.id === to.id);
      if (toIndex === -1) {
        const _tn = nodePens.find((item) => item.id === to.id);
        nodes.push({
          id: to.id,
          nodeId: _tn?.data.nodeId,
          name: _tn?.name || "",
          prev: [
            {
              id: from.id,
              anchorId: from.anchorIndex,
            },
          ],
          next: [],
        });
      } else {
        const toNode = nodes[toIndex];
        toNode.prev.push({
          id: from.id,
          anchorId: from.anchorIndex,
        });
        nodes.splice(toIndex, 1, toNode);
      }
    });

    return {
      chartData: {
        // 画布数据
        flowChartId: instance.data.data.flowChartId,
      },
      nodes,
    };
  }
};

export default { actions, getCommandExecutor, strip, generateAssociation };
