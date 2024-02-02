// CustomModal.js

import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const CustomModal = ({ isOpen, onClose, initialRef, onEdit, value, editType }) => {
  const finalRef = React.useRef(null);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    onEdit(editedValue);
    onClose();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {editType}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl>
              <FormLabel>{editType}</FormLabel>
              {/* Use Input component with type "date" */}
              <Input
                ref={initialRef}
                type={editType === "Date of Birth" ? "date" : "text"}
                defaultValue={value}
                placeholder={`Enter ${editType}`}
                onChange={(e) => setEditedValue(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
