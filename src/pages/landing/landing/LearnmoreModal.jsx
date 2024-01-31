import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

const LearnmoreModal = ({isOpen,onClose,size}) => {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const [size, setSize] = React.useState('md')
  
   
    return (
        <div>
            <>
        {/* {sizes.map((size) => (
          <Button
            onClick={() => handleSizeClick(size)}
            key={size}
            m={4}
          >{`Open ${size} Modal`}</Button>
        ))} */}
  
        <Modal onClose={onClose} size={size} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Explore Vibin' Features"</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
           

Welcome to Vibin', the ultimate social experience!  Curious about what sets us apart? Click below to delve into the exciting features that make Vibin' a haven for self-expression and meaningful connections. Unleash your creativity with personalized profiles, connect seamlessly with like-minded souls, and discover diverse communities tailored to your interests. Stay in the loop with real-time updates, curate your unique feed, and immerse yourself in exclusive events. Privacy is our priority, ensuring a secure space for you to be yourself. Ready to elevate your social journey? Join the Vibin' movement now!
              {/* <Lorem count={2} /> */}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
        </div>
    );
};

export default LearnmoreModal;
