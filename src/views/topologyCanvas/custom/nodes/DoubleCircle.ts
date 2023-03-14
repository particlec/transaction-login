import { Node } from "@topology/core";

export default {
  drawFn: (ctx: CanvasRenderingContext2D, node: Node) => {
    // 圆心坐标 x
    const cx = node.rect.x + node.rect.width * 0.5;
    // 圆心坐标 y
    const cy = node.rect.y + node.rect.height * 0.5;

    ctx.beginPath();
    ctx.ellipse(
      cx,
      cy,
      node.rect.width * 0.5,
      node.rect.height * 0.5,
      0,
      0,
      Math.PI * 2
    );
    ctx.moveTo(cx + node.rect.width * 0.4, cy);
    ctx.ellipse(
      cx,
      cy,
      node.rect.width * 0.4,
      node.rect.height * 0.4,
      0,
      0,
      Math.PI * 2
    );
    (node.fillStyle || node.bkType) && ctx.fill();
    ctx.stroke();
  },
};
