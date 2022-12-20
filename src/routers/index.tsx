import { createBrowserRouter, RouteObject } from "react-router-dom";
import React from "react";
import CustomRouter from "./customRouters";

const routeObjects: RouteObject[] = CustomRouter.map((route) => {
  if (route.layout) {
    return {
      element: route.layout,
      children: [{ path: route.path, element: route.component }],
    };
  } else {
    return { path: route.path, element: route.component };
  }
});
const router = createBrowserRouter(routeObjects);

export default router;