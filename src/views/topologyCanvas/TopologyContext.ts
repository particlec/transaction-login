import { Pen, Topology } from "@topology/core";
import React from "react";

import UtCanvas from "./UtCanvas";

export default React.createContext<{
  topology?: Topology;
  utCanvas?: UtCanvas;
}>({
  topology: undefined,
  utCanvas: undefined,
});
