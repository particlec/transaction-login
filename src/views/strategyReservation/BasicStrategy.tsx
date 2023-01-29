import React, { useEffect } from "react";
import mockApi from "../../apis/mockApi";

const BasicStrategy = () => {
  // 获取辅与t的相遇时刻
  // const getIntersectionTime = () => {};

  useEffect(() => {
    mockApi
      .getTest()
      .then((res: any) => {
        console.log(res.data);
      })
      .catch();
  }, []);

  return <div>111</div>;
};
export default BasicStrategy;
