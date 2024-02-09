import { FaEllipsis } from "react-icons/fa6";
import { AiFillLike, AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { BiShare } from "react-icons/bi";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const FeedCard = ({ singlePost,index,user,likes }) => {
  const  {caption,createdAt,postContent,contentType}=singlePost;
  console.log('possstt',singlePost);
  const formattedCreatedAt = new Date(createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <div className="flex justify-center">
      <div className="border bg-white mt-2 shadow-md w-full  rounded min-h-36 flex flex-col justify-between gap-10">
      <div className=" px-4 pt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img className="w-10 h-10 rounded-full" src={user?.data?.avatar} alt="" />

           <div className="flex flex-col"> <h4 className="font-bold">{user?.data?.fullName}</h4>
            <p className="text-[10px]">{formattedCreatedAt}</p></div>
          </div>
          <Menu>
            <MenuButton>
              <FaEllipsis className="text-2xl" />
            </MenuButton>
            <MenuList>
              {" "}
              <MenuItem>Save post</MenuItem>
              <MenuItem>Share</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <p className="mt-2 text-xl">{caption}</p>
      </div>
      {postContent && contentType == "image" && (
        <img
          className="mt-2  w-10/12 mx-auto rounded-md  shadow-md h-[300px] md:h-[450px]"
          src={postContent}
          alt=""
        />
      )}
      {postContent && contentType == "video" && (
        <video
          src={postContent}
          width="320"
          height="240"
          autoPlay
          loop
          muted
          controls
          className="mt-2 w-full h-[300px] md:h-[450px]"
        >
          Your browser does not support the video tag.
        </video>
      )}
      <div className="mt-2 px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {likes !== -1 ? (
            <AiFillLike
              // onClick={async () => {
              //   likeHandler(post._id);
              //   await postsRefetch();
              // }}
              className="text-2xl text-color-one"
            />
          ) : (
            <AiOutlineLike
              // onClick={async () => {
              //   likeHandler(post._id);
              //   await postsRefetch();
              // }}
              className="text-2xl"
            />
          )}
          <GoComment className="text-2xl" />
        </div>
        <span>
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </span>
        <BiShare className="text-2xl" />
      </div>
    </div>
    </div>
    // <div className="border bg-gray-50 rounded w-8/12 mx-auto">
    //   <div className=" px-4 pt-4">
    //     <div className="flex justify-between items-center">
    //       <div className="flex gap-2 items-center">
    //         <img className="w-10 h-10 rounded-full" src={''} alt="" />

    //         <h4 className="font-bold">{singlePost?.user?.fullName}</h4>
    //         <p>{createdAt}</p>
    //       </div>
    //       <FaEllipsis className="text-2xl" />
    //     </div>
    //     <p className="mt-2 text-xl">{caption}</p>
    //   </div>
    //   <img className="mt-2 w-full h-[200px] md:h-[250px]" src={postContent} alt="" />
    //   <div className="mt-2 px-4 pb-4 flex items-center justify-between">
    //     <div className="flex items-center gap-2">
    //       <AiOutlineLike className="text-2xl" />
    //       <GoComment className="text-2xl" />
    //     </div>
    //     <AiOutlineShareAlt className="text-2xl" />
    //   </div>
    // </div>
  );
};

export default FeedCard;
