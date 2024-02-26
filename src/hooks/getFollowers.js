import axios from "axios";
import getAccessToken from "../utils/getAccessToken";
const token = getAccessToken();

export const getFollowingUsers = async () => {
  try {
    const { data } = await axios("https://vibin-c5r0.onrender.com/api/v1/users/get-following-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowers = async () => {
  try {
    const res = await axios("https://vibin-c5r0.onrender.com/api/v1/users/get-followers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
