import axios from "axios";
import getAccessToken from "../utils/getAccessToken";
const auth = getAccessToken();

export const getFollowingUsers = async () => {
  try {
    const { data } = await axios(
      "http://localhost:8000/api/v1/users/get-following-users",
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowers = async () => {
  try {
    const res = await axios(
      "http://localhost:8000/api/v1/users/get-followers",
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
