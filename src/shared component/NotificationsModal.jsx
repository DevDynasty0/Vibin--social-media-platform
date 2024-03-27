import {
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import notificationAvatar from "../assets/images/avatar.png";

const NotificationsModal = ({
  notifictionOnOpen,
  isNotificationOpen,
  notifictionOnClose,
  notificationState,
}) => {
  //   const userData = useSelector((state) => state.auth.user);
  //  const {data} = useGetNotificationsByUserIdQuery(userData?._id)

  // console.log(notificationState, "notificaion state");

  return (
    <>
      <Modal
        isOpen={isNotificationOpen}
        onClose={notifictionOnClose}
        scrollBehavior={"inside"}
        size={"xs"}
        blockScrollOnMount={false}
      >
        <ModalContent
          position={"absolute"}
          right={2}
          top={0}
          className="h-1/2  !bg-slate-50"
        >
          {/* <ModalCloseButton /> */}

          <ModalBody>
            {notificationState.filter(
              (notification) => notification.isRead === false
            ).length > 0 ? (
              <ul className="flex flex-col gap-2 ">
                {notificationState
                  .filter((notification) => notification.isRead === false)
                  .map((singleNotifi, idx) => (
                    <li key={idx} className="flex items-center gap-2  ">
                      <img
                        className="w-12 h-12 rounded-full  "
                        src={
                          singleNotifi?.senderId?.avatar || notificationAvatar
                        }
                      />
                      <span>{singleNotifi?.message}</span>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className=""> You have no unread notifications !!!!!!!</div>
            )}

            {/* {notificationState.length > 0 ? (
              <ul className="flex flex-col gap-5">
                {notificationState.filter(
                  (notification) => notification.isRead === false
                ).length > 0
                  ? notificationState
                      .filter((notification) => notification.isRead === false)
                      .map((singleNotifi, idx) => (
                        <li key={idx}>
                          <img
                            className="w-12 h-12 rounded-full mr-5"
                            src={
                              singleNotifi?.senderId?.avatar ||
                              notificationAvatar
                            }
                          />
                          <span>{singleNotifi?.message}</span>
                        </li>
                      ))
                  : notificationState.map((singleNotifi, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-start gap-5"
                      >
                        <img
                          className="w-10 h-10 rounded-full  "
                          src={
                            singleNotifi?.senderId?.avatar || notificationAvatar
                          }
                        />
                        <span>{singleNotifi?.message}</span>
                      </li>
                    ))}
              </ul>
            ) : (
              <div>NO notifications yet!!!!!!!</div>
            )} */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

NotificationsModal.propTypes = {};

export default NotificationsModal;
