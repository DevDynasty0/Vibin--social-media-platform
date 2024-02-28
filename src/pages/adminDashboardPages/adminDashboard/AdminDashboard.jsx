import axios from "axios";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [postsCount, setPostsCount] = useState(0);

  const [suspendedUsers, setSuspendedUsers] = useState([]);

  const data = [
    { name: "Jan 1-7", uv: 400 },
    { name: "Jan 8-14", uv: 500 },
    { name: "Jan 15-21", uv: 600 },
    { name: "Jan 15-21", uv: 700 },
    { name: "Jan 15-21", uv: 650 },
    { name: "Jan 15-21", uv: 800 },
    { name: "Jan 15-21", uv: 900 },
    { name: "Jan 15-21", uv: 950 },
  ];

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/admin/allUsers`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/admin/totalPostCount`)
      .then((res) => res.json())
      .then((data) => setPostsCount(data.data));
  }, []);

  useEffect(() => {
    const fetchSuspendedUsers = async () => {
      const res = await axios.get(
        " http://localhost:8000/api/v1/admin/getSuspendUsers"
      );
      setSuspendedUsers(res.data.data);
    };
    fetchSuspendedUsers();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl">{users.length}</p>
            <p>Total Users</p>
          </div>
        </div>
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl">{postsCount}</p>
            <p>Total Posts</p>
          </div>
        </div>
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl">{suspendedUsers?.length}</p>
            <p>Suspended Users</p>
          </div>
        </div>
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl"> 157</p>
            <p>Reported Posts</p>
          </div>
        </div>
      </div>

      <div className="w-[800px] h-auto mt-20 mx-auto">
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            name="Weekly posts"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

          <XAxis dataKey="name">
            {/* <Label value="Weekly posts" offset={-1} position="insideBottom" /> */}
          </XAxis>
          <Legend></Legend>
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default AdminDashboard;
