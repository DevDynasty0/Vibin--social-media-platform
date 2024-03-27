import { useState } from "react";
import {
  useCaptionGenaratorMutation,
  useImageGenaratorMutation,
  usePostGenaratedDataMutation,
} from "../../redux/features/vibin-ai/vibinAiApi";
import { useSelector } from "react-redux";
import axios from "axios";
import "../../../src/styles/color.css";
import { LuRefreshCcw } from "react-icons/lu";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@chakra-ui/react";
import getAccessToken from "../../utils/getAccessToken";
import { FaCopy, FaDownload } from "react-icons/fa";

const GenarateCaption = () => {
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [isCaptionLoading, setIsCaptionLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [captionBtn, setCaptionBtn] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [activeGenerator, setActiveGenerator] = useState("caption");
  const token = getAccessToken();

  const [captionGenarator] = useCaptionGenaratorMutation();
  const [imageGenarator] = useImageGenaratorMutation();
  const [postGenaratedData] = usePostGenaratedDataMutation();
  let user = useSelector((state) => state.auth.user);
  user = user || {};

  const handleGenerate = async (e) => {
    e.preventDefault();
    const userPrompt = e.target.userPrompt.value;
    setIsCaptionLoading(true);
    setIsImageLoading(true);
    // Set loading state to true

    if (activeGenerator === "caption") {
      const result = await captionGenarator({ prompt: userPrompt });
      if (result?.data?.caption) {
        e.target.userPrompt.value = "";
        setPrompt(userPrompt);
        setGeneratedCaption(result.data.caption);
      } else {
        setGeneratedCaption("Something went wrong!");
      }
    } else if (activeGenerator === "image") {
      const result = await imageGenarator({ prompt: userPrompt });
      if (result?.data?.imageUrl) {
        e.target.userPrompt.value = "";
        setGeneratedImage(result.data.imageUrl[0].url);
      } else {
        setGeneratedImage("Something went wrong!");
      }
    }
    setIsCaptionLoading(false);
    setIsImageLoading(false);
  };

  // console.log("cccc", imageSource);
  // console.log("image", generatedImage);
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setButtonSpinner(true);
    // const formData = new FormData();
    // formData.append("postContent", generatedImage);
    // formData.append("caption", generatedCaption);
    // formData.append("contentType", generatedImage ? "image" : "");

    const newPost = {
      user: user._id,
      // type:'post'
      caption: generatedCaption || "",
      // postType:generatedImage?'image':"",
      postContent: generatedImage,
      contentType: generatedImage ? "image" : "",
    };
    console.log("new poststtts", newPost);
    try {
      // const res = await axios.post(
      //   "https://vibin-c5r0.onrender.com/api/v1/posts/post",
      //   // { newPost, formData },
      //   newPost,
      //   {
      //     withCredentials: true,
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      const res = await postGenaratedData(newPost);
      console.log(res);

      if (res.data) {
        toast.success("Post uploaded successfully!"); // Display success toast message
        setButtonSpinner(false);
        handleRefresh();
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  const handleRefresh = () => {
    // Reset all state values to clear the form data
    setGeneratedCaption("");
    setGeneratedImage("");
    setPrompt("");
    // setImagePrompt("");
  };
  return (
    <div className="">
      <div className="text-center mt-20 mb-6">
        <h1 className="text-color-one font-bold text-2xl font-sans my-2">
          {" "}
          Vibin'
          <span className="bg-black text-white ml-2 h-4 w-4 p-1 rounded">
            Ai
          </span>{" "}
        </h1>
        <p className="text-gray-600">
          Your Companion for creating{" "}
          <span>engaging comments and Stunning images!</span>{" "}
        </p>
      </div>

      <div className="">
        {buttonSpinner ? (
          <div className=" pt-[10%] items-center xl:max-w-[55%] lg:[70%] w-[90%] min-h-[35vh]  h-full relative bg-[#DEBBDF]  mx-auto flex flex-col justify-between p-4    rounded-t-lg shadow">
            {" "}
            {/* <Spinner color="blue.500" /> */}
            <div className="loader text-color-one"></div>
          </div>
        ) : (
          <div className="xl:max-w-[55%] lg:[70%] w-[90%] min-h-[34vh]  h-full relative bg-[#DEBBDF]  mx-auto flex flex-col justify-between p-4    rounded-t-lg shadow  ">
            <div className="   mx-auto h-[90%]  ">
              {isCaptionLoading || isImageLoading ? (
                //    <Spinner className="mt-[20%]" color="gray.500" />
                // <div className="text-center mt-[20%]  animate-bounce">
                <div className="text-center mt-[20%] ">
                  {/* Loading.... <br /> */}
                  <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                  </div>{" "}
                  <br />
                  Please wait this might take a minute.
                </div>
              ) : (
                <div className="p-5">
                  <div
                    className={`${
                      generatedCaption.length > 0 ? "block" : "hidden"
                    }`}
                  >
                    {/* <h4 className="font-semibold text-xl">{prompt}</h4> */}

                    <p className="mt-1 relative bg-gray-200 p-2 rounded-md">
                      {generatedCaption}
                      {generatedCaption && (
                        <span
                          onClick={() => {
                            navigator.clipboard.writeText(generatedCaption);
                          }}
                          className="absolute cursor-copy bottom-2 
                          text-xl right-0 text-color-one"
                        >
                          <FaCopy />
                        </span>
                      )}
                    </p>
                  </div>

                  <div
                    className={`${
                      generatedImage.length > 0 ? "block relative" : "hidden"
                    }`}
                  >
                    {/* <h4 className="font-semibold text-xl">{prompt}</h4> */}
                    <img
                      className="mt-1 h-[30%] w-full mx-auto"
                      src={generatedImage}
                      onLoad={(e) => setImageSource(e.target.value)}
                      alt=""
                    />{" "}
                    <a
                      href={generatedImage}
                      target="_blank"
                      download
                      rel="noopener noreferrer"
                    >
                      <span
                        className="absolute cursor-pointer bottom-0 
                          text-xl font-light right-0 text-black bg-gray-300 p-0.5 rounded-md  "
                      >
                        <FaDownload />
                      </span>
                    </a>
                  </div>

                  {generatedCaption.length == 0 &&
                    generatedImage.length == 0 && (
                      <div className="text-center  h-[35vh] mt-[4%] text-color-one text-md lg:text-xl">
                        Hi {user.fullName}! Confused how to express your vibe?
                        <br />
                        Let Vibin' Ai help you
                      </div>
                    )}

                  {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="xl:max-w-[55%] lg:[70%] w-[90%] mx-auto bg-white px-4 py-3  rounded-b-lg">
          <div className="flex gap-5 mt-2 items-center">
            <button
              className={`btn btn-sm bg-gray-300 text-gray-400 py-1 px-2 text-xs md:text-sm rounded-md ${
                activeGenerator === "caption" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setActiveGenerator("caption")}
            >
              Caption Generator
            </button>

            {/* <button className={`btn btn-sm bg-gray-300 text-gray-400 py-1 text-xs md:text-sm px-2 rounded-md ${activeGenerator === "caption" ? "bg-green-500 text-white" : ""}`} onClick={() => setActiveGenerator("caption")}>Caption Generator</button> */}
            <button
              className={`btn btn-sm bg-gray-300 text-gray-400 py-1 px-2 text-xs md:text-sm rounded-md ${
                activeGenerator === "image" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setActiveGenerator("image")}
            >
              Image Generator
            </button>

            <div
              onClick={handleRefresh}
              className="flex items-center gap-2 text-white hover:bg-blue-200 hover:text-black md:bg-red-500  py-1 px-2 rounded-md "
            >
              {" "}
              <button className="hidden md:block md:text-sm">
                Refresh
              </button>{" "}
              <LuRefreshCcw className="text-lg md:text-white text-black"></LuRefreshCcw>
            </div>
          </div>

          {/* {isCaptionLoading && <Spinner color="blue.500" />} */}
          <form onSubmit={handleGenerate} className="mt-3">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center w-full border rounded-3xl border-gray-500  h-12 px-2">
                <div className="w-full ">
                  {activeGenerator === "caption" ? (
                    <textarea
                      name="userPrompt"
                      className="border border-transparent  bg-transparent  w-full focus:outline-none text-sm h-10 flex items-center"
                      type="text"
                      placeholder="Give your prompt for caption"
                    />
                  ) : (
                    <textarea
                      name="userPrompt"
                      className="border border-transparent bg-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                      type="text"
                      placeholder="Give your prompt for image"
                    />
                  )}
                </div>
              </div>{" "}
              <div className="ml-6">
                <button className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 hover:bg-green-300  text-white">
                  <svg
                    className="w-5 h-5 transform rotate-90 -mr-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="xl:max-w-[55%] lg:[70%] w-[90%] mt-[1%] mx-auto pb-10">
        <button
          onClick={handlePostSubmit}
          className=" disabled:bg-gray-300 cursor-pointer w-full  px-3 py-2 text-sm font-medium text-center text-white bg-color-one rounded-lg hover:bg-violet-500 "
          disabled={!generatedCaption && !generatedImage ? true : false}
        >
          Drop Vibe
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GenarateCaption;
