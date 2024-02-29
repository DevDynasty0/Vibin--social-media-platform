



    import { useState } from "react";
import { useCaptionGenaratorMutation, useImageGenaratorMutation } from "../../redux/features/vibin-ai/vibinAiApi";
import { useSelector } from "react-redux";
import getAccessToken from "../../utils/getAccessToken";
import axios from "axios";

import { LuRefreshCcw } from "react-icons/lu";

const GenarateCaption = () => {
    const [generatedCaption,  setGeneratedCaption] = useState("");
    const [generatedImage, setGeneratedImage] = useState("");
    const [prompt, setPrompt] = useState("");
    const [imageSource, setImageSource] = useState("");
    const [isCaptionLoading, setIsCaptionLoading] = useState(false);
    const [captionBtn, setCaptionBtn] = useState(false);
const[buttonSpinner,setButtonSpinner]=useState(false)
const [activeGenerator, setActiveGenerator] = useState(null);
    const [captionGenarator] = useCaptionGenaratorMutation();
    const [imageGenarator] = useImageGenaratorMutation();
    const user = useSelector((state) => state.auth.user);
    const token = getAccessToken();
    const handleGenerate = async (e) => {
      e.preventDefault();
      const userPrompt = e.target.userPrompt.value;
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
  };
  
    // const handleGenarateCaption = async(e) => {
    //     e.preventDefault();
    //     const userPrompt = e.target.userPrompt.value;
    //     console.log(userPrompt);
    //     const result = await captionGenarator({prompt: userPrompt});
    //     // console.log(result.data.caption);
    //     if(result?.data?.caption){
    //         e.target.userPrompt.value = "";
    //         setPrompt(userPrompt);
    //         setGenaratedCaption(result.data.caption)
    //     }
    //     else{
    //         e.target.userPrompt.value = "";
    //         setPrompt(userPrompt);
    //         setGenaratedCaption("Something went wrong!")
    //     }
    
    // }

    
  //   const handleGenarateImage = async(e) => {
  //     e.preventDefault();
  //     const userPrompt = e.target.userPrompt.value;
  //     console.log(userPrompt);
  //     const result = await imageGenarator({prompt: userPrompt});
  //     console.log('data',result.data.imageUrl);
  //     if(result?.data?.imageUrl){
  //         e.target.userPrompt.value = "";
  //         // setImagePrompt(userPrompt);
  //         setGenaratedImage(result.data.imageUrl[0].url)
  //     }
  //     else{
  //         e.target.userPrompt.value = "";
  //         // setPrompt(userPrompt);
  //         setGenaratedImage("Something went wrong!")
  //     }
  
  // }
  console.log('cccc',imageSource);
  console.log('image',generatedImage); 
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setButtonSpinner(true);
    const formData = new FormData();
    formData.append("postContent", generatedImage);
    formData.append("caption",generatedCaption);
    formData.append("contentType", generatedImage? 'image' : "");

    const newPost = {
      user: user._id,
      caption : generatedCaption,
     isImageUrl:true,
      postContent: formData.get("postContent"),
      contentType: generatedImage? 'image' : "",
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/posts/post",
        // { newPost, formData },
        newPost,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const res = await createPost(newPost);
      console.log(res);
      if (res.data) {
        // postsRefetch();
        setButtonSpinner(false);

        // onclose();
        // setCaption("");
        // setSelectedItem(null);
      }
    } catch (error) {
      console.log(error);
    }
  }; 
//    const handleRefresh = () => {
//     // Reset all state values to clear the form data
//     setGeneratedCaption("");
//     setGeneratedImage("");
//     setPrompt("");
//     setImagePrompt("");
// };
    return (
        // <div className="bg-white rounded p-3 mt-6 mb-4">
        //     <div>
        //         <h3 className="text-2xl font-medium"> Confused how to express your vibe?</h3>
        //         <p className="mt-1">Let <span className="text-color-one">Vibin AI</span> elevate your expression.</p>
        //         <div className={`${genaratedCaption.length > 0 ? "block" : "hidden"}`}>
        //             <h4 className="font-semibold text-xl">{prompt}</h4>
        //             <p className="mt-1">{genaratedCaption}</p>  
        //         </div>
        //         <div className={`${genaratedImage.length > 0 ? "block" : "hidden"}`}>
        //             {/* <h4 className="font-semibold text-xl">{prompt}</h4> */}
                    
        //             <img className="mt-1" src={genaratedImage} alt="" />
        //         </div>
        //         <form onSubmit={handleGenarateCaption} className="mt-2">
        //             <textarea name="userPrompt" className="border border-black outline-none w-full rounded p-2 focus-visible:border-color-one" type="text" placeholder="Give you prompt" />
        //             <button type="submit" className="mt-1 bg-color-one text-white rounded p-1"> Generate Caption</button>
        //         </form>
        //         <form onSubmit={handleGenarateImage} className="mt-2">
        //             <textarea name="userPrompt" className="border border-black outline-none w-full rounded p-2 focus-visible:border-color-one" type="text" placeholder="Give you prompt" />
        //             <button type="submit" className="mt-1 bg-color-one text-white rounded p-1">Generate Image</button>
        //         </form>

                
        //     </div>
        // </div>



        <div className="">
          

<div className="max-w-[50%] h-full relative mx-auto flex flex-col justify-between p-4 bg-white  rounded-lg shadow  ">
    
    <div className="   mx-auto h-[90%] ">
    <div className="p-5">
        
        {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5> */}
        <div className={`${generatedCaption.length > 0 ? "block" : "hidden"}`}>
                 {/* <h4 className="font-semibold text-xl">{prompt}</h4> */}
                <p className="mt-1 text-wrap text-center">{generatedCaption}</p>  
           </div>

           <div className={`${generatedImage.length > 0 ? "block" : "hidden"}`}>
               {/* <h4 className="font-semibold text-xl">{prompt}</h4> */}
                
               <img className="mt-1 h-[30%] w-[80%] mx-auto" src={generatedImage} onLoad={(e) => setImageSource(e.target.value)} alt="" />
            </div>
    
            {generatedCaption.length==0 && generatedImage.length == 0 && (
        <div className="text-center my-20 text-gray-300 text-xl">How can I help you <br /> to genarate your captions and images?</div>
      )}
          
            
          {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}

   
</div>
    </div>
    

<div>
<div className="flex gap-5 mt-2 items-center">
                    <button className={`btn btn-sm bg-gray-300 text-gray-400 py-1 px-2 rounded-md ${activeGenerator === "caption" ? "bg-green-500 text-white" : ""}`} onClick={() => setActiveGenerator("caption")}>Caption Generator</button>
                    <button className={`btn btn-sm bg-gray-300 text-gray-400 py-1 px-2 rounded-md ${activeGenerator === "image" ? "bg-green-500 text-white" : ""}`} onClick={() => setActiveGenerator("image")}>Image Generator</button>
                  
                <div className="flex items-center gap-2 text-white hover:bg-blue-200 hover:text-black bg-red-500  py-1 px-2 rounded-md "> <button className="" >Refresh</button> < LuRefreshCcw className="text-lg text-white"></LuRefreshCcw></div>
                </div>
<form onSubmit={handleGenerate} className="mt-2">
                    {activeGenerator === "caption" ? (
                        <textarea name="userPrompt" className="border border-black outline-none w-full rounded p-2 focus-visible:border-color-one" type="text" placeholder="Give your prompt for caption" />
                    ) : (
                        <textarea name="userPrompt" className="border border-black outline-none w-full rounded p-2 focus-visible:border-color-one" type="text" placeholder="Give your prompt for image" />
                    )}
                    <button type="submit" className="mt-1 bg-color-one text-white rounded py-1 px-2">Generate</button>
                </form>
    
               
</div>
<div className=" absolute bottom-0 right-0">
<button onClick={handlePostSubmit} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Post
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
</div>
</div>

        </div>
    );
};

export default GenarateCaption;
// import { useCaptionGenaratorMutation, useImageGenaratorMutation } from "../../redux/features/vibin-ai/vibinAiApi";
// const GenarateCaption = () => {
//     const [genaratedCaption, setGenaratedCaption] = useState("");
//     const [prompt, setPrompt] = useState("");
//     // const [isCaptionLoading, setIsCaptionLoading] = useState(false);

//     const [captionGenarator] = useCaptionGenaratorMutation();
//     const [imageGenarator]= useImageGenaratorMutation();

//     const handleGenarateCaption = async(e) => {
//         e.preventDefault();
//         const userPrompt = e.target.userPrompt.value;
//         console.log(userPrompt);
//         const result = await captionGenarator({prompt: userPrompt});
//         // console.log(result.data.caption);
//         if(result?.data?.caption){
//             e.target.userPrompt.value = "";
//             setPrompt(userPrompt);
//             setGenaratedCaption(result.data.caption)
//         }
//         else{
//             e.target.userPrompt.value = "";
//             setPrompt(userPrompt);
//             setGenaratedCaption("Something went wrong!")
//         }
//         console.log(genaratedCaption);
    
//     }
    
//     return (
//         <div className="">
//           <div className="text-center mb-6"><h1 className="text-color-one font-bold text-2xl font-sans "> Vibin <span className="bg-black text-white h-4 w-4 p-1 rounded">Ai</span> </h1>
//           <p className="text-gray-600">Your Companion for creating <span>engaging comments and Stunning images!</span>  </p>
//           </div>
           
// <div className="flex flex-row h-[70vh] mx-auto antialiased w-[50%] text-gray-800">
    
//     <div className="flex flex-col h-full w-full bg-white rounded-md px-4 py-6">
     
//       <div className="h-full overflow-hidden py-4">
//         <div className="h-full overflow-y-auto">
//         {genaratedCaption && genaratedCaption.length > 0 && (
//           <div className="grid grid-cols-12 gap-y-2">
           
//             <div className="col-start-6 col-end-13 p-3 rounded-lg">
//               <div className="flex items-center justify-start flex-row-reverse">
//                 <div
//                     className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 flex-shrink-0"
//                 >
//                   A
//                 </div>
//                 <div
//                     className="relative mr-3 text-sm bg-green-100 py-2 px-4 shadow rounded-xl"
//                 >
//                   <div><h4 className=" ">{prompt}</h4></div>
//                 </div>
//               </div>
//             </div>
           
            
//             <div className="col-start-1 col-end-8 p-3 rounded-lg">
//               <div className="flex flex-row items-center">
//                 <div
//                     className="flex items-center justify-center h-10 w-10 rounded-full gradient-one text-white flex-shrink-0"
//                 >
//                   A
//                 </div>
//                 <div
//                     className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
//                 >
//                   <div>
//                   <p className="">{genaratedCaption}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//           </div>)}
//           {genaratedCaption.length == 0 && (
//             <div className="text-center mt-[20%] text-gray-300 text-xl">How can I help you <br /> to genarate your captions and images?</div>
//           )}
//         </div>
//       </div>
//       <form onSubmit={ handleGenarateCaption} className="">
//       <div className="flex flex-row items-center">
//         <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
          
//           <div className="w-full">
            
//             {/* <input type="text"
//                    className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" placeholder="Type your message...."></input> */}



//                     <textarea name="userPrompt" className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" type="text" placeholder="Give your prompt" />
//                    {/* <button type="submit" className="mt-1 bg-red-500 text-white rounded p-1">Generate</button> */}
                
//           </div>
          
//         </div>
//         <div className="ml-6">
//           <button className="flex items-center justify-center h-10 w-10 rounded-full bg-color-one hover:bg-green-300  text-white">
//             <svg className="w-5 h-5 transform rotate-90 -mr-px"
//                  fill="none"
//                  stroke="currentColor"
//                  viewBox="0 0 24 24"
//                  xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       </form>
//     </div>
//   </div> 
//         </div>
//     );
// };

// export default GenarateCaption;