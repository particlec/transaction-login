import { Direction, Node, Point } from "@topology/core";

export default {
  anchorsFn: (node: Node) => {
    const x = node.rect.x;
    const y = node.rect.y;
    const width = node.rect.width;
    const height = node.rect.height;

    node.anchors.push(new Point(x + width / 2, y, Direction.Up));
    node.anchors.push(new Point(x + width / 2, y + height, Direction.Bottom));
  },
};
