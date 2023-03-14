import { Node } from "@topology/core";

export default {
  drawFn: (ctx: CanvasRenderingContext2D, node: Node) => {
    ctx.beginPath();
    ctx.closePath();
    (node.fillStyle || node.bkType) && ctx.fill();
    ctx.stroke();
  },
};
