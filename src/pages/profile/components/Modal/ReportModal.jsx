import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React from 'react';

const ReportModal = ({onOpen,onClose}) => {
    const { isOpen} = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')
  
  const btnRef = React.useRef(null)
    return (
        <div>
              <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           hdfhhbjsedhbjsfhbsf
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

             <Button mt={3} ref={btnRef} onClick={onOpen}>
        Trigger modal
      </Button>
        </div>
    );
};

export default ReportModal;