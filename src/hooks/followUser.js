import axios from "axios";
import getAccessToken from "../utils/getAccessToken";

export const followUser = async (profileId, followerId) => {
  try {
    const auth = await getAccessToken();
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/follow-user",
      {
        profile: profileId,
        follower: followerId,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
