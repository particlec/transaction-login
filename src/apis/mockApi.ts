import axiosInstance from "../utils/axiosInstance";

export default {
  getTest: () => {
    return axiosInstance.get(`/hello`);
  },
};
