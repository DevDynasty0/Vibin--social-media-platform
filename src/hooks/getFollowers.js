import axios from "axios";

export const getFollowingUsers = async () => {
  const res = await axios("/api/v1/users/get-following-users");
  console.log(res.data);
  return res.data;
};

export const getFollowers = async () => {
  const res = await axios("/api/v1/users/get-followers");
  console.log(res.data);
  return res.data;
};
