import axios from "axios";
import getAccessToken from "../utils/getAccessToken";

export const getSuggestedUsers = async () => {
  const token = getAccessToken();
  const { data } = await axios("/api/v1/users/suggested-users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data?.data;
};
