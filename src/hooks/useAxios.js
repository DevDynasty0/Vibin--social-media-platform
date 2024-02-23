import axios from "axios";
import getAccessToken from "../utils/getAccessToken";
const token = getAccessToken();

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
