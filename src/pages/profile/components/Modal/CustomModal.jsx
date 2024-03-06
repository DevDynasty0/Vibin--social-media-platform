// CustomModal.js

import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const CustomModal = ({
  isOpen,
  onClose,
  initialRef,
  onEdit,
  editType,
  editedValue,
  setEditedValue,
}) => {
  const finalRef = React.useRef(null);

  // Set the initial date value to the previous date from today
  useEffect(() => {
    if (editType === "dob" && !editedValue) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1); // Get the previous date
      const formattedDate = currentDate.toISOString().split("T")[0];
      // console.log(formattedDate);
      setEditedValue(formattedDate);
    }
  }, [editType, editedValue, setEditedValue]);

  const handleSave = async () => {
    await onEdit(editedValue);
    onClose();
  };
  // console.log("editedvalue", editedValue);
  // Reset the edited value when the modal is opened
  useEffect(() => {
    setEditedValue(editedValue);
  }, [editedValue, setEditedValue]);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
              <Input
                type={editType === "dob" ? "date" : "text"}
                placeholder={`Enter ${editType}`}
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                max={editType === "dob" ? getCurrentDate() : undefined}
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
