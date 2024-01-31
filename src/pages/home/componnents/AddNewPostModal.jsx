import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import avatar from "../../../assets/images/avatar.png"
import { FaPlus } from 'react-icons/fa6';

const AddNewPostModal = ({ isOpen, onOpen, onClose, caption, setCaption, selectedItem, setSelectedItem }) => {

    const user = useSelector((state) => state.auth.user);
    const handleFileSelect = e => {
        // console.log(e.target.files[0]);
        setSelectedItem(URL.createObjectURL(e.target.files[0]));
    };

    return (<div>

        <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <div className="flex gap-2 items-center px-2">
                        <img
                            className="h-10 w-10 rounded"
                            src={user?.avatar ? user.avatar : avatar}
                            alt=""
                        />
                        <h3 className="text-xl font-semibold">{user?.fullName}</h3>
                    </div>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <textarea onChange={(e) => setCaption(e.target.value)} value={caption ? caption : ""} placeholder={`What are you vibin', ${user?.fullName}`} className="border-0 w-full outline-none p-2 rounded resize-none" name="caption" id="caption" rows="2" />
                        {

                            selectedItem ?
                                <img className="mt-2 h-[350px] w-full object-cover" src={selectedItem} />
                                :
                                <div>
                                    <input className="hidden" type="file" name="file" id="file" onChange={handleFileSelect} />
                                    <label className="block" htmlFor="file">
                                        <div className='mt-2 bg-gray-100 h-[200px] w-full flex justify-center items-center flex-col gap-2 cursor-pointer'>
                                            <div className="p-2 rounded bg-white">
                                                <FaPlus size="1.5rem" />
                                            </div>
                                            <span>Add photo/video</span>
                                        </div>
                                    </label>
                                </div>
                        }
                    </form>
                </ModalBody>

                <ModalFooter>
                    {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button> */}
                    <button className="w-full block py-0.5 px-3 bg-color-one rounded text-lg font-semibold text-white">
                        Vibe{" "}
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
    )
};

export default AddNewPostModal;