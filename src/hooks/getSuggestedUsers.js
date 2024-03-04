import axios from "axios";
import getAccessToken from "../utils/getAccessToken";

export const getSuggestedUsers = async () => {
  const token = getAccessToken();
  const { data } = await axios("https://vibin-c5r0.onrender.coms/api/v1/users/suggested-users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data?.data;
};
