// CustomModal.js

import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Input, ModalFooter } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const CustomModal = ({ isOpen, onClose, initialRef, onEdit, editType, editedValue, setEditedValue }) => {
  const finalRef = React.useRef(null);

  const handleSave = async () => {
    await onEdit(editedValue);
    onClose();
  };

  // Reset the edited value when the modal is opened
  useEffect(() => {
    setEditedValue(editedValue);
  }, [editedValue, setEditedValue]);

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
              <Input
                type={editType === "dob" ? "date" : "text"}
                placeholder={`Enter ${editType}`}
                value={editedValue}
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
