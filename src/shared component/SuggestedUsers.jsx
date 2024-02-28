import { useEffect, useState } from "react";
import axios from "axios";
import RightButton from "./RightButton";
import getAccessToken from "../utils/getAccessToken";
import { useSuggestedUsersQuery } from "../redux/features/user/userApi";

const SuggestedUsers = () => {
  // const [suggestedUsers, setSuggestedUsers] = useState([]);
  // const token = getAccessToken();
  // console.log(suggestedUsers);

  // useEffect(() => {
  //   axios("/api/v1/users/suggested-users", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(({ data }) => {
  //       setSuggestedUsers(data?.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  const {data:suggestedUsers} = useSuggestedUsersQuery();

console.log("suggested users", suggestedUsers);
  return (
    <>
      <h4 className="p-3 text-color-one text-opacity-85 underline font-semibold   mb-3">
        Suggested Friends
      </h4>
      {suggestedUsers?.data?.map((user) => (
        <RightButton key={user._id} person={user} />
      ))}
    </>
  );
};

SuggestedUsers.propTypes = {};

export default SuggestedUsers;
