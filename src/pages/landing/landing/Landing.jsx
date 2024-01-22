import logo from '../../../assets/logo-vibin.jpg'
import Footer from '../footer/Footer';
const Landing = () => {
    return (
        <div className='h-screen flex flex-col justify-between'>
            <div className='flex flex-col lg:flex-row items-center justify-center  w-full text-center'>
            <div><img className='w-64 md:w-72  lg:w-full' src="./vibin-logo.png" alt="" /></div>
            <div className='lg:border-l-4 border-gray-300 border-spacing-4 p-10'>
                <h1 className='text-3xl mb-5'>Connecting Vibes!</h1>
                <h3>Share your vibes and murmurs with your friends and foes</h3>
                <div className='flex flex-col  border-opacity-50'>
                <button className='btn border-2 px-3 py-2 mt-20 rounded bg-[#030C4D] text-white'>Create Account</button>
                <div className='flex items-center gap-2'>
                    
                    <hr className='h-[2px] w-full bg-gray-200' />
                    <p className='divider text-center my-5'>OR</p>
                    <hr className='h-[2px] w-full bg-gray-200' />
                </div>
                <button className='btn  border-solid border-[#030C4D] rounded border-2 px-3 py-2 text-[#3D728E] font-bold'>Sign In</button>
                </div>
            </div>
           

 
        </div>
       <div className=' '>
       <Footer></Footer>
       </div>
        </div>
    );
};

export default Landing;
