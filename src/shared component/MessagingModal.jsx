import { useState } from 'react';
import useAuthCheck from '../hooks/useAuthCheck';
import avatar from '../assets/images/avatar.png'

const MessagingModal = () => {
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const {user} = useAuthCheck()
    console.log('hi',user);
    const messageAvatarStyle ='w-[30px] border border-[#904486]  h-[30px] rounded-full'
    const messageFromOutsideShow = 'border overflow-hidden p-1 text-sm w-[80%] bg-gray-100 whitespace-nowrap overflow-ellipsis'
  
    return (
      <>
        <div>
          <div className={`bg-white shadow-md  rounded-t-lg pt-3 space-y-5 fixed bottom-0 right-7 px-3 w-[27%] transition-all duration-500  ${isMessageOpen ? 'transition-all duration-500 h-[61vh]' : 'transition-all duration-500 h-[65px] '}`}>
            <div className='flex justify-between  items-center '>
              <div className='flex items-center gap-3'>
                <img src={user?.avatar ? user.avatar : avatar} className='w-[50px] text-gray-800 border-2 border-[#904486] h-[50px] rounded-full' />
                <h4 className='font-medium'>Messaging</h4>
              </div>
              {/* <div >
                <label className="relative  inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#904486]"></div>
                </label>
              </div> */}
              <div className=''>
              <i onClick={()=>setIsMessageOpen(!isMessageOpen)} className={`fa-solid text-2xl text-[#904486] hover:bg-slate-300 hover:rounded-full arrow ${isMessageOpen ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
              </div>
            </div>
            
           {
              isMessageOpen && <div className='space-y-3 overflow-y-auto h-[calc(100%-4rem)]'>
                  <div className='flex  gap-3'>
                      <img className={messageAvatarStyle}  src={avatar} alt="" />
                      <p className={messageFromOutsideShow}>Tset messsssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                  </div>
                  <div className='flex gap-3'>
                      <img className={messageAvatarStyle} src={avatar} alt="" />
                      <p className={messageFromOutsideShow}>Tset messsssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                  </div>
                  <div className='flex gap-3'>
                      <img className={messageAvatarStyle} src={avatar} alt="" />
                      <p className={messageFromOutsideShow}>Tset messsssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                  </div>
                  <div className='flex gap-3'>
                      <img className={messageAvatarStyle}  src={avatar} alt="" />
                      <p className={messageFromOutsideShow}>Tset messsssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                  </div>
                  <div className='flex gap-3'>
                      <img className={messageAvatarStyle}  src={avatar} alt="" />
                      <p className={messageFromOutsideShow}>Tset messsssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                  </div>
                  <div className='flex gap-3'>
                      <img className={messageAvatarStyle}  src={avatar} alt="" />
                      <p className={messageFromOutsideShow}>Tset messsssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                  </div>
                  <div className='flex gap-3'>
                      <img className={messageAvatarStyle}  src={avatar} alt="" />
                      <p className={messageFromOutsideShow}>Tset messsssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                  </div>
              </div>
           }
  
          </div>
        </div>
      </>
    );
};

export default MessagingModal;