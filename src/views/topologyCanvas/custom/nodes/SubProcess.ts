import { Node } from "@topology/core";

export default {
  drawFn: (ctx: CanvasRenderingContext2D, node: Node) => {
    const x = node.rect.x;
    const y = node.rect.y;
    const width = node.rect.width;
    const height = node.rect.height;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.moveTo(x + width / 6, y);
    ctx.lineTo(x + width / 6, y + height);
    ctx.moveTo(x + (width * 5) / 6, y);
    ctx.lineTo(x + (width * 5) / 6, y + height);

    ctx.closePath();
    (node.fillStyle || node.bkType) && ctx.fill();
    ctx.stroke();
  },
};
