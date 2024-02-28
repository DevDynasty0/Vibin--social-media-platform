import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack } from "@chakra-ui/react";


const AiAdvertisement = () => {
    return (
        <div><Card maxW='sm'className=" mx-auto rounded-md" >
        <CardBody className="bg-blue-500 ">
          {/* <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          /> */}
          <Stack mt='6' spacing='3' className="text-white">
            <Heading size='md'>Living room Sofa</Heading>
            <p>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design with a
              sprinkle of vintage design.
            </p>
            <Button variant='solid' className="bg-yellow-500">
              Buy now
            </Button>
          </Stack>
        </CardBody>
        <Divider />
        {/* <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Buy now
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter> */}
      </Card>
            
        </div>
    );
};

export default AiAdvertisement;