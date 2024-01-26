import axios from "axios";

export const getSuggestedUsers = async () => {
  const { data } = await axios("/api/v1/users/suggested-users");
  console.log(data.data);
  return data?.data;
};
