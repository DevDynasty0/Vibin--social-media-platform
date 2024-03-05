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
  ResponsiveContainer,
  Label,
  BarChart,
  Bar,
} from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [postsCount, setPostsCount] = useState(0);

  const [suspendedUsers, setSuspendedUsers] = useState([]);

  // const [totalReportCount, setTotalReportCount] = useState({
  //   reportedUsersCount: 0,
  //   reportedPostsCount: 0,
  // });

  const [userGrowthChartData, setUserGrowthChartData] = useState([]);

  const [postRateChartData, setPostRateChartData] = useState([]);
  const [postTypeChartData, setPostTypeChartData] = useState([]);

  useEffect(() => {
    fetch(`https://vibin-c5r0.onrender.com/api/v1/admin/allUsers`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);

  useEffect(() => {
    fetch(`https://vibin-c5r0.onrender.com/api/v1/admin/totalPostCount`)
      .then((res) => res.json())
      .then((data) => setPostsCount(data.data));
  }, []);

  useEffect(() => {
    console.log("urioujer");
    const fetchSuspendedUsers = async () => {
      const res = await axios.get(
        " https://vibin-c5r0.onrender.com/api/v1/admin/getSuspendUsers"
      );
      setSuspendedUsers(res.data.data);
    };
    fetchSuspendedUsers();
  }, []);

  // useEffect(() => {
  //   const loadTotalReportCount = async () => {
  //     const res = await axios.get(
  //       "http://localhost:8000/api/v1/admin/getTotalReportsCount"
  //     );
  //     // console.log(res.data);
  //     setTotalReportCount(res.data);
  //   };
  //   loadTotalReportCount();
  // }, []);

  useEffect(() => {
    const loadUserGrowthChartData = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/getUserGrowthChartData"
      );
      setUserGrowthChartData(res.data);
    };
    loadUserGrowthChartData();
  }, []);
  useEffect(() => {
    const loadPostRateChartData = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/GetPostRateChartData"
      );
      console.log(res.data, "_____________--i");
      setPostRateChartData(res.data);
    };
    loadPostRateChartData();
  }, []);
  useEffect(() => {
    const loadPostTypeChartData = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/getPostTypeChartData"
      );
      setPostTypeChartData(res.data);
    };
    loadPostTypeChartData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
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
        {/* <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
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
                d="M13 2C13 2 6 2 5 7M5 7V15C5 16.0609 5.42143 17.0783 6.12132 17.7782C6.82121 18.4781 7.83858 18.8985 8.89949 18.8985H15.2426C16.3035 18.8985 17.3209 18.4781 18.0208 17.7782C18.7207 17.0783 19.1411 16.0609 19.1411 15V7M5 7H19M8 11H16"
              ></path>
            </svg>


          </div>
          <div className="text-right">
            <p className="text-2xl">{totalReportCount?.reportedUsersCount}</p>
            <p>Reported Users</p>
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
            <p className="text-2xl">{totalReportCount?.reportedPostsCount}</p>
            <p>Reported Post</p>
          </div>
        </div> */}
      </div>

      <div className="mt-20 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 auto-rows-[400px]">
        <ResponsiveContainer>
          <BarChart
            // width={800}
            // height={400}
            data={userGrowthChartData}
            margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
          >
            <XAxis dataKey="_id">
              <Label
                value="Last 7th week users growth"
                offset={0}
                position="bottom"
              />
            </XAxis>

            <YAxis />
            <Tooltip />
            <Bar
              dataKey="userJoined"
              name="Users Joined"
              fill="#8884d8"
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer>
          <LineChart
            data={postRateChartData}
            margin={{ top: 10, right: 20, bottom: 20, left: 0 }}
          >
            <XAxis dataKey="_id">
              <Label
                value="Last 7th week post rates"
                offset={0}
                position="bottom"
              />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              name="Post"
              dataKey="totalPosts"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <CartesianGrid strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
