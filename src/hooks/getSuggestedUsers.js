import axios from "axios";
import getAccessToken from "../utils/getAccessToken";

export const getSuggestedUsers = async () => {
  const auth = getAccessToken();
  const { data } = await axios(
    "http://localhost:8000s/api/v1/users/suggested-users",
    {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    }
  );
  return data?.data;
};
