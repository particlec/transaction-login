import React, { useState } from "react";

import CanvasModal from "./canvasModal";
import { Button } from "antd";

const TestSports = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 把flex 换成绝对定位
  return (
    <>
      <div>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          openModal
        </Button>
      </div>

      {isOpen && <CanvasModal />}
    </>
  );
};
export default TestSports;
