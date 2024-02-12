import { FaEllipsis } from "react-icons/fa6";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import moment from "moment";
import { Button, InputGroup, InputRightElement,Image, Menu, MenuButton, MenuItem, MenuList,Input } from "@chakra-ui/react";
import { BiShare } from "react-icons/bi";

// import { useLikeMutation } from "../../../redux/features/post/postApi";
// import { Input } from "postcss";

const PostCard = ({  post, currentUser, onLikeHandler, MenuItems  }) => {
  const { user, likes, caption, postContent, createdAt, contentType } = post;
  // const [like] = useLikeMutation();

  // const likeHandler = (postId) => {
  //   like({ postId });
  // };

  const isLiked = likes?.indexOf(currentUser?.email);
  const getPostAge = moment(createdAt).fromNow();
  return (
    <div className="border bg-white mt-2 shadow-md rounded min-h-36 flex flex-col justify-between gap-4">
      <div className="  w-[90%] mx-auto pt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img className="w-10 h-10 rounded-full" src={user?.avatar} alt="" />

            <h4 className="font-bold">{user?.fullName}</h4>
            <p>{getPostAge}</p>
          </div>
          <Menu>
            <MenuButton>
              <FaEllipsis className="text-2xl" />
            </MenuButton>
            <MenuItems>
            
              
            </MenuItems>
          </Menu>
        </div>
        <p className="mt-2 w-[90%]  text-xl">{caption}</p>
      </div>
      {postContent && contentType == "image" && (
        <img
          className=" w-[90%] mx-auto h-[300px] md:h-[450px]"
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

      <div className="flex justify-between w-[90%] mx-auto">
      <span>
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </span>
        <div className="flex gap-5">
        <p>Comment:200</p>
        <p>Share:100</p>
        </div>
      </div>
      <div className="mt-2  pb-4 w-[90%] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
          {isLiked !== -1 ? (
            <AiFillLike
              onClick={onLikeHandler}
              className="text-2xl text-color-one"
            />
          ) : (
            <AiOutlineLike onClick={onLikeHandler} className="text-2xl" />
          )}
          <div><p>Likes</p></div>
          {/* <GoComment className="text-2xl" /> */}
        </div>
        {/* <span>
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </span> */}
        <div className="flex items-center gap-2">
        <button  className=" cursor-pointer"> <GoComment className="text-2xl" /></button>
         <p>comment</p>
        </div>
        
       <div className="flex items-center gap-2">
       <BiShare className="text-2xl" />
       <p>Share</p>
       </div>
      
      </div>
      <hr />
      {/* do comment */}
      <div className=" px-5 py-3">

   <InputGroup size='lg'>
      <Input
        pr='4.5rem'
        type='text'
        placeholder='Enter your comment'
      />
      <InputRightElement width='4.5rem'>
        <Button h='2rem'  size='lg' bg='#904486' textColor='white'  marginEnd='3' >
         Post
        </Button>
      </InputRightElement>
    </InputGroup>
{/* show comment */}
<hr className="mt-3"></hr>
<div className="w-[90%] mt-4 px-5">
 <div className="flex gap-5  items-start ">

 <Image
  borderRadius='full'
  boxSize='35px'
  src='https://bit.ly/dan-abramov'
  alt='Dan Abramov'
/>
  
 
 <div className="w-full bg-gray-100 rounded-md p-3">
 <div className="flex items-center  gap-4">
 <p className="font-bold">Ismail Hossain</p>
  <p className="text-sm">an hour ago</p>
 </div>
  <p className="mt-2">Amk fele eka eka khaw!!! vlo  Shazam. Shazam is a popular song-identifier app that works on most smartphones and even has an extension for web browsers. ...</p>
 </div>
 </div>
 
</div>
</div>


    </div>
  );
};

export default PostCard;
