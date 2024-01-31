

import landing from '../../../assets/images/landing-2-removebg-preview.png'
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import '../../../styles/color.css'

const Landingx = () => {
 
    return (
      <div className="h-screen flex flex-col justify-between">
           <div className="relative bg-vibin">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-white"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative  sm:mx-auto   sm:text-center">
           {/*  */}
           
            <div className='flex flex-col lg:flex-row items-center justify-center'>
<div>
<img src={landing} alt="" />
</div>
<div>
<div className=" bg-white text-center rounded-md shadow-xl border-spacing-4 p-10">
          <h1 className="md:text-5xl text-3xl mb-5 font-bold  ">Vib<span className='text-color-one font-bold'>in'</span> </h1>
          <h3>Share your vibes and murmurs with your friends and foes</h3>
          <div className="flex flex-col  border-opacity-50">
            <Link
              to="/sign-up"
              className="btn border-2 px-3 py-2 mt-20 rounded bg-color-one text-white"
            >
              Create Account
            </Link>
            <div className="flex items-center gap-2">
              <hr className="h-[2px] w-full bg-gray-200" />
              <p className="divider text-center my-5">OR</p>
              <hr className="h-[2px] w-full bg-gray-200" />
            </div>
            <Link
              to={"/login"}
              className="btn  border-solid border-color-one rounded border-2 px-3 py-2 text-black font-bold"
            >
              Sign In
            </Link>
          </div>
        </div>
</div>
            </div>
            {/*  */}
           
          </div>
        </div>
      </div> 
      <div className=" ">
        <Footer></Footer>
      </div> 
        </div>
    );
};

export default Landingx;

