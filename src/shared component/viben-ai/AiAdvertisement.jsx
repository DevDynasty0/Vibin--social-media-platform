// import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack } from "@chakra-ui/react";


// const AiAdvertisement = () => {
//     return (
//         <div><Card maxW='sm'className=" mx-auto rounded-md" >
//         <CardBody className="bg-green-500 ">
//           {/* <Image
//             src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
//             alt='Green double couch with wooden legs'
//             borderRadius='lg'
//           /> */}
//           <Stack mt='6' spacing='3' className="text-white">
//             <Heading size='md'>Living room Sofa</Heading>
//             <p>
//               This sofa is perfect for modern tropical spaces, baroque inspired
//               spaces, earthy toned spaces and for people who love a chic design with a
//               sprinkle of vintage design.
//             </p>
//             <Button variant='solid' className="bg-yellow-500">
//               Buy now
//             </Button>
//           </Stack>
//         </CardBody>
//         <Divider />
//         {/* <CardFooter>
//           <ButtonGroup spacing='2'>
//             <Button variant='solid' colorScheme='blue'>
//               Buy now
//             </Button>
//             <Button variant='ghost' colorScheme='blue'>
//               Add to cart
//             </Button>
//           </ButtonGroup>
//         </CardFooter> */}
//       </Card>
            
//         </div>
//     );
// };

// export default AiAdvertisement;








import { useState } from 'react';
import { Button, Card, CardBody, Divider, Heading, Stack } from "@chakra-ui/react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const AiAdvertisement = () => {
  const [showAd, setShowAd] = useState(true);

  const handleClose = () => {
    setShowAd(false);
  };
 const navigate =useNavigate()
  return (
    <>
      {showAd && (
        <div className=" p-3  ">
          <div className="bg-[#451859] relative rounded-md w-[80%]">
            <div  className="text-white p-2">
            <div className="text-white text-3xl flex  justify-end" onClick={handleClose}>
               <IoIosClose className='hover:rotate-90  hover:transition-all duration-1000 hover:text-4xl'></IoIosClose>
              </div>
            
             <Heading size='md'>Introducing Vibin' <span className='py-1 px-3 rounded bg-black text-white'>Ai</span> </Heading>
              {/* <div className="text-color-one text-3xl" onClick={handleClose}>
               <IoIosClose></IoIosClose>
              </div> */}
            
              <p className='mb-10'>
              Your Ultimate Caption Companion & Image Generator for Perfect Social Media Posts!
              Let's Check it out!!
              </p>
             <button onClick={()=>navigate('vibinai')} className=' bg-red-500 absolute  bottom-2 right-2 px-5 py-1 rounded '>Click</button>
              
            </div>
          </div>
          <Divider />
        </div>
      )}
    </>
  );
};

export default AiAdvertisement;
