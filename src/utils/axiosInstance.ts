import axios from "axios";
import JsonBigInt from "json-bigint";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:9000",
  transformResponse: [
    function transformResponse(data) {
      if (typeof data === "string") {
        try {
          // 使用 JsonBigInt 将长整型转换为字符串，避免前端取值时发生精度丢失。
          data = JsonBigInt({ storeAsString: true }).parse(data);
        } catch (e) {
          console.log("JsonBigInt 转换出错");
        }
      }
      return data;
    },
  ],
});

export default axiosInstance;
