import axios from "axios";
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const SuspendedUsers = () => {

    const [ suspendedUsers, setSuspendedUsers ] = useState([]);

    const navigate = useNavigate();

    useEffect(()=> {
        const fetchSuspendedUsers = async () => {
            const res = await axios.get('http://localhost:8000/api/v1/admin/getSuspendUsers')
            setSuspendedUsers(res.data.data);
        }
        fetchSuspendedUsers();
    },[])

    console.log(suspendedUsers);

    const handleSuspendUndo = (id) => {
        console.log(id);
    }

    return (
        <div>
           <TableContainer>
        <Table variant="simple" className="relative">
          <Thead className="bg-gray-50 shadow-md">
            <Tr>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th> Email </Th>
              <Th> Suspend Date </Th>
              <Th> Action </Th>
            </Tr>
          </Thead>
          <Tbody>
            {suspendedUsers.map((user) => (
              <Tr key={user?.normalUser?._id}>
                <Td>
                  <img
                    className="w-[30px] h-[30px] rounded"
                    src={user?.normalUser?.avatar}
                    alt=""
                  />
                </Td>
                <Td>{user?.normalUser?.fullName}</Td>
                <Td>{user?.normalUser?.email}</Td>
                <Td>{moment(user?.normalUser?.createdAt).format("MMM Do YY")}</Td>
                <Td>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSuspendUndo(user?.normalUser?._id)}
                      className="bg-red-500 px-2 py-1 text-white rounded text-sm"
                    >
                      Undo
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${user?.normalUser?._id}`)}
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

export default SuspendedUsers;