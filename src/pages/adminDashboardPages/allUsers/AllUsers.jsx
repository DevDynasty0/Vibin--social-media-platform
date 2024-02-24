import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../../../hooks/useAuthCheck";
import axios from "axios";
import Swal from "sweetalert2";
import getAccessToken from "../../../utils/getAccessToken";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useAuthCheck();
  const navigate = useNavigate();
  const token = getAccessToken();

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/admin/allUsers`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);

  console.log(users);

  const handleSuspendUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to suspend this user ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          normalUser: id,
          admin: currentUser._id,
        };

        const res = await axios.post(
          `http://localhost:8000/api/v1/admin/suspendUser`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res, "crated suspend user");

        // if (res.data.insertedId) {
        //   Swal.fire({
        //     title: "Deleted!",
        //     text: "Your file has been deleted.",
        //     icon: "success",
        //   });
        // }
      }
    });
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple" className="relative">
          <Thead className="bg-gray-50 shadow-md">
            <Tr>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th> Email </Th>
              <Th> Joined </Th>
              <Th> Action </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>
                  <img
                    className="w-[30px] h-[30px] rounded"
                    src={user?.avatar}
                    alt=""
                  />
                </Td>
                <Td>{user?.fullName}</Td>
                <Td>{user?.email}</Td>
                <Td>{moment(user?.createdAt).format("MMM Do YY")}</Td>
                <Td>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSuspendUser(user?._id)}
                      className="bg-red-500 px-2 py-1 text-white rounded text-sm"
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${user?._id}`)}
                      className=" bg-blue-500 px-2 py-1 text-white rounded text-sm"
                    >
                      View Profile
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUsers;
