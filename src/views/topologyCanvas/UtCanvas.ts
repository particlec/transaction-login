import { KeydownType, Pen, Topology } from "@topology/core";
import { Options } from "@topology/core/src/options";
import PubSub from "pubsub-js";
import { register } from "./custom";

const defaultOptions: Options = {
  // 是否禁止双击节点文字，出现文字输入框
  hideInput: false,

  // 是否隐藏节点旋转控制点
  hideRotateCP: true,

  // 是否隐藏节点大小控制点
  // hideSizeCP: true,

  // 是否禁止连线终点为空（未连接到节点）
  disableEmptyLine: true,

  // 是否禁止重复的连线（起止点相同的线）
  disableRepeatLine: true,

  // 禁用快捷键，使用自定义实现
  // keydown: -1,

  // 禁用鼠标缩放
  disableScale: true,

  // 禁用节点中心添加锚点
  autoAnchor: false,

  // 配置网格
  grid: true,
  gridColor: "#DBF0F9",
  gridSize: 20,

  on: (event, data) => {
    // console.log(event);
    PubSub.publishSync("UT_CANVAS_EVENT", {
      data,
      event,
    });
  },
};

const strip = (num: number, precision = 12) => {
  return +parseFloat(num.toPrecision(precision));
};

export default class UtCanvas {
  instance: Topology;

  constructor(parent: string | HTMLElement, options?: Options) {
    const mergedOptions = Object.assign({}, defaultOptions, options);
    this.instance = new Topology(parent, mergedOptions);

    if (mergedOptions.keydown === KeydownType.None) {
      document.onkeydown = this.onkeydown.bind(this);
    }

    if (mergedOptions.disableScale === true) {
      this.instance.divLayer.canvas.onwheel = this.onwheel.bind(this);
    }

    // 注册自定义节点
    register();

    return this;
  }

  // 键盘事件
  onkeydown(key: KeyboardEvent) {
    const that = this.instance;
    // 画布已锁定不触发
    // input、textarea 内的键盘事件不重写
    if (
      that.data.locked ||
      key.target instanceof HTMLInputElement ||
      key.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    let done = false;
    let moveX = 0;
    let moveY = 0;
    switch (key.key) {
      // ctrl + a 全选
      case "a":
      case "A":
        if (key.ctrlKey) {
          that.activeLayer.setPens(that.data.pens);
          done = true;
        }
        break;
      // ctrl + c 复制
      case "c":
      case "C":
        if (key.ctrlKey) {
          that.copy();
        }
        break;
      // ctrl + d 创建副本
      case "d":
      case "D":
        if (key.ctrlKey) {
          that.copy();
          that.paste();
          done = true;
        }
        break;
      // ctrl + g 组合 / ctrl + shift + g 取消组合
      case "g":
      case "G":
        if (key.ctrlKey && key.shiftKey) {
          if (that.activeLayer.pens.length === 1) {
            that.uncombine(that.activeLayer.pens[0]);
            done = true;
          }
        } else if (key.ctrlKey) {
          if (that.activeLayer.pens.length > 0) {
            that.combine(that.activeLayer.pens);
            done = true;
          }
        }
        break;
      // ctrl + v 粘贴
      case "v":
      case "V":
        if (key.ctrlKey) {
          that.paste();
        }
        break;
      // 剪切
      case "x":
      case "X":
        if (key.ctrlKey) {
          that.cut();
        }
        break;
      // ctrl + z 撤销 / ctrl + shift + z 恢复
      case "z":
      case "Z":
        if (key.ctrlKey && key.shiftKey) {
          that.redo();
        } else if (key.ctrlKey) {
          that.undo();
        }
        break;
      case "-":
        if (strip(that.data.scale) > 0.5) {
          that.scaleTo(strip(that.data.scale - 0.1));
        }
        done = true;
        break;
      case "=":
        if (strip(that.data.scale) < 1.5) {
          that.scaleTo(strip(that.data.scale + 0.1));
        }
        done = true;
        break;
      // 删除
      case "Delete":
      case "Backspace":
        that.delete();
        break;
      // 左移动
      case "ArrowLeft":
        moveX = -5;
        if (key.ctrlKey) {
          moveX = -1;
        }
        done = true;
        break;
      // 上移动
      case "ArrowUp":
        moveY = -5;
        if (key.ctrlKey) {
          moveY = -1;
        }
        done = true;
        break;
      // 右移动
      case "ArrowRight":
        moveX = 5;
        if (key.ctrlKey) {
          moveX = 1;
        }
        done = true;
        break;
      // 下移动
      case "ArrowDown":
        moveY = 5;
        if (key.ctrlKey) {
          moveY = 1;
        }
        done = true;
        break;
      default:
        break;
    }

    if (!done) {
      return;
    }

    key.preventDefault();

    if (moveX || moveY) {
      that.activeLayer.saveNodeRects();
      that.activeLayer.move(moveX, moveY);
      that.overflow();
      that.animateLayer.animate();
    }

    that.render();
    that.cache();
  }

  // 鼠标滚轮事件
  onwheel(event: WheelEvent) {
    const that = this.instance;

    // ctrl + 鼠标滚轮才会触发缩放功能
    // 且缩放比例限制在 50% - 150%
    if (event.ctrlKey) {
      event.preventDefault();
      if (event.deltaY < 0) {
        if (strip(that.data.scale) < 1.5) {
          that.scaleTo(strip(that.data.scale + 0.1));
        }
      } else {
        if (strip(that.data.scale) > 0.5) {
          that.scaleTo(strip(that.data.scale - 0.1));
        }
      }
      that.divLayer.canvas.focus();
      return false;
    }
  }

  // 更新节点
  updatePen(pen: Pen) {
    const that = this.instance;
    const i = that.findIndex(pen);
    if (i > -1) {
      that.data.pens.splice(i, 1, pen);
      that.updateProps();
    }
  }
}
