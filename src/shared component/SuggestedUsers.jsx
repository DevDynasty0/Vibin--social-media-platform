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
    <div className="bg-white p-3 xl:w-[80%] py-3 mt-10 mb-3 rounded">
      <h4 className=" text-color-one pb-2 font-semibold ">
        Suggested Friends
      </h4>
      {suggestedUsers?.data?.map((user) => (
        <RightButton key={user._id} person={user} />
      ))}
    </div>
  );
};

SuggestedUsers.propTypes = {};

export default SuggestedUsers;
