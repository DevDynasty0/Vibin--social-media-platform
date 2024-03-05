import { useEffect, useState } from "react";
import axios from "axios";
import RightButton from "./RightButton";
import getAccessToken from "../utils/getAccessToken";
import { useSuggestedUsersQuery } from "../redux/features/user/userApi";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

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

  const { data: suggestedUsers, isLoading: suggestedUsersLoading } =
    useSuggestedUsersQuery();

  console.log("suggested users", suggestedUsers);
  return (
    <div className="bg-white p-3 xl:w-[80%] py-3 my-5 rounded">
      <h4 className=" text-color-one pb-2 font-semibold ">Suggested Friends</h4>
      {suggestedUsersLoading
        ? [1, 2, 3, 4].map((skel) => (
            <div key={skel}>
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={2}
                spacing="2"
                skeletonHeight="2"
              />
            </div>
          ))
        : suggestedUsers?.data?.map((user) => (
            <RightButton key={user._id} person={user} />
          ))}
    </div>
  );
};

SuggestedUsers.propTypes = {};

export default SuggestedUsers;
