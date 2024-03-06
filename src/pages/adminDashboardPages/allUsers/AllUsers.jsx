import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import defaultProfile from "../../../assets/images/avatar.png";

import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import Swal from "sweetalert2";
import useAuthCheck from "../../../hooks/useAuthCheck";
import getAccessToken from "../../../utils/getAccessToken";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const token = getAccessToken();

  const { user: currentUser } = useAuthCheck();

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
            withCredentials: true,
          }
        );
        console.log(res, "crated suspend user");
      }
    });
  };

  const filterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      const cellDate = moment(cellValue);

      const cellDateWithoutTime = cellDate.startOf("day");
      const filterDateWithoutTime = moment(filterLocalDateAtMidnight).startOf(
        "day"
      );

      if (cellDateWithoutTime.isBefore(filterDateWithoutTime)) {
        return -1;
      }
      if (cellDateWithoutTime.isAfter(filterDateWithoutTime)) {
        return 1;
      }
      return 0;
    },
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "avatar",
      headerName: "Avater",
      sortable: false,
      cellRenderer: (data) => (
        <div className="flex items-center h-full w-full">
          <img
            className="h-[80%] w-11 object-cover rounded flex justify-center items-center"
            src={`${data.value || defaultProfile}`}
          />
        </div>
      ),
    },

    {
      field: "fullName",
      headerName: "Name",
      filter: true,
      floatingFilter: true,
      unSortIcon: true,
    },
    {
      field: "email",
      headerName: "email",
      filter: true,
      floatingFilter: true,
      unSortIcon: true,
    },
    {
      field: "createdAt",
      headerName: "Joined",
      filter: "agDateColumnFilter",
      floatingFilter: true,
      filterParams: filterParams,
      valueFormatter: (p) => moment(p.value).format("MMM Do YY"),
      sort: "desc",
      unSortIcon: true,
    },
    {
      field: "",
      headerName: "View",
      sortable: false,
      cellRenderer: (data) => (
        <button
          onClick={() => navigate(`/profile/${data?.data?._id}`)}
          className=" bg-blue-500 px-2 py-1 text-white rounded text-sm"
        >
          View Profile
        </button>
      ),
    },
    {
      field: "",
      headerName: "Action",
      sortable: false,
      cellRenderer: (data) => (
        <button
          onClick={() => handleSuspendUser(data?.data?._id)}
          className="bg-red-500 px-2 py-1 text-white rounded text-sm"
        >
          Suspend
        </button>
      ),
    },
  ]);
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/admin/allUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())

      .then((data) => {
        setRowData(data.data);
      });
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      menuTabs: [],

      minWidth: 100,
    };
  }, []);

  return (
    <div className="h-[calc(100vh-64px)]">
      <div
        style={{ width: "100%", height: "100%" }}
        className="ag-theme-quartz"
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          suppressMenuHide
          paginationPageSize={30}
          suppressDragLeaveHidesColumns={true}
          paginationPageSizeSelector={[30, 50, 100]}
        />
      </div>
    </div>
  );
};

export default AllUsers;
