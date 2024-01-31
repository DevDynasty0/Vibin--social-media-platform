import axios from "axios";

export const getFollowingUsers = async () => {
  try {
    const { data } = await axios("/api/v1/users/get-following-users");
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowers = async () => {
  try {
    const res = await axios("/api/v1/users/get-followers");
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
