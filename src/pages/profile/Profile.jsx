import { useParams } from "react-router-dom";
import useAuthCheck from "../../hooks/useAuthCheck";
import "../../styles/color.css";
import Cover from "./components/cover/Cover";

import LeftContent from "./components/leftContent/LeftContent";
import MiddleContent from "./components/middleContent/MiddleContent";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Profile() {
  const [userProfile,setUserProfile]=useState();
  const { user,setUser } = useAuthCheck();
  const {id}=useParams();
  console.log('user:',user);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data }=await axios.get(`/api/v1/users/${id}`)
       

     
        setUserProfile(data.data)
        console.log('data',data);
      } catch (error) {
        console.error("Error fetching User Profile data:", error);
      }
    };

    fetchData();
  }, [id]);
console.log('userprofile',userProfile);
  return (
    <div className='bg-gray-100'>
      <div className="bg-gray-100 max-w-7xl mx-auto bg-vibin ">
      <Cover></Cover>

      <div className="lg:w-[70vw] gap-3 mt-10 w-full mx-auto  grid lg:gap-7 lg:grid-cols-7  md:grid-cols-5 grid-col-1">
       
        <div className="w-full -mt-10 h-screen bg-white   md:col-span-2  ">
          <LeftContent />
        </div>

        {/* Middle Content Begin */}
        <div className="md:col-span-5 ">
          <MiddleContent user={user}setUser={setUser}userProfile={userProfile}></MiddleContent>
        </div>

        {/* Right Content Begin */}
        {/* <div className="hidden lg:block  md:col-span-2  ">
          <RightContent></RightContent>
        </div> */}
      </div>
    </div>
    </div>
  );
}
