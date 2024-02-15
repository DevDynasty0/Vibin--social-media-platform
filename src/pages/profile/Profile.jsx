import { useParams } from "react-router-dom";
import "../../styles/color.css";
import Cover from "./components/cover/Cover";
import LeftContent from "./components/leftContent/LeftContent";
import MiddleContent from "./components/middleContent/MiddleContent";
import { useGetUserByIdQuery } from "../../redux/features/user/userApi";
import { Spinner } from "@chakra-ui/react";
import { useGetPostsByUserIdQuery } from "../../redux/features/post/postApi";
import Navbar from "../../shared component/Navbar";
import { useSelector } from "react-redux";

export default function Profile() {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    refetch: refetchUserInfo,
  } = useGetUserByIdQuery(id);
  const loggedInUser = useSelector((state) => state.auth.user.email);

  const {
    data: myPost,
    isLoading: isPostsLoading,
    isSuccess: isPostsSuccess,
    refetch: refetchProfilePosts,
  } = useGetPostsByUserIdQuery({
    userId: id,
  });
  console.log("uservvvv", user?.data?.email);
  console.log(loggedInUser);
  const reversedPosts = myPost ? [...myPost].reverse() : [];

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div className="w-full  ">
        <div className=" max-w-[90%] mx-auto  ">
          <Cover
            user={user}
            loggedInUser={loggedInUser}
            refetchUserInfo={refetchUserInfo}
          ></Cover>

          <div className="lg:w-[70vw] gap-3 mt-10 w-full mx-auto  rounded-lg shadow-lg    grid lg:gap-7 lg:grid-cols-8  md:grid-cols-5 grid-col-1">
            <div className="w-full -mt-10 h-[70%]  md:col-span-5  lg:col-span-3  ">
              <LeftContent
                user={user}
                refetchUserInfo={refetchUserInfo}
                refetchProfilePosts={refetchProfilePosts}
                loggedInUser={loggedInUser}
              ></LeftContent>
            </div>

            {/* Middle Content Begin */}
            <div className="md:col-span-5 ">
              <MiddleContent
                user={user}
                reversedPosts={reversedPosts}
                isLoading={isPostsLoading}
                isSuccess={isPostsSuccess}
                refetchUserInfo={refetchUserInfo}
                loggedInUser={loggedInUser}
              ></MiddleContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
