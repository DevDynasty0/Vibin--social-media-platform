import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);

  const [ postsCount, setPostsCount ] = useState(0);

  const [ suspendedUsers, setSuspendedUsers ] = useState([]);


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

  useEffect(()=> {
    const fetchSuspendedUsers = async () => {
        const res = await axios.get('http://localhost:8000/api/v1/admin/getSuspendUsers')
        setSuspendedUsers(res.data.data);
    }
    fetchSuspendedUsers();
},[])

  return (
   <div>
    {/*   Stats card */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
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

          {/* <!-- Contenedor de las 4 secciones (disminuido para dispositivos pequeños) --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-2">
            {/* <!-- Sección 1 - Gráfica de Usuarios (disminuida para dispositivos */}

            {/* <!-- Sección 1 - Gráfica de Usuarios --> */}
            <div className=" bg-white   p-4 rounded-md ">
              <h2 className="text-gray-500 text-lg font-semibold pb-1">
                Usuarios
              </h2>
              {/* <div class="my1-"></div> <!-- Espacio de separación --> */}
              <div className="bg-gradient-to-r from-blue-300 to-blue-500 h-px  mb-6"></div>
              {/* <!-- Línea con gradiente --> */}
              <div
                className="chart-container"
                style={{ position: "relative", height: "150px", width: "100%" }}
              >
                {/* <!-- El canvas para la gráfica --> */}
                <canvas id="usersChart"></canvas>
              </div>
            </div>

            {/* <!-- Sección 2 - Gráfica de Monthly Users --> */}
            <div className="bg-white p-4 rounded-md">
              <h2 className="text-gray-500 text-lg font-semibold pb-1">
                Monthly Users
              </h2>
              <div className="my-1"></div>
              {/* <!-- Espacio de separación --> */}
              <div className="bg-gradient-to-r from-blue-300 to-blue-500 h-px mb-6"></div>
              {/* <!-- Línea con gradiente --> */}
              <div
                className="chart-container"
                style={{ position: "relative", height: "150px", width: "100%" }}
              >
                {/* <!-- El canvas para la gráfica --> */}
                <canvas id="commercesChart"></canvas>
              </div>
            </div>

            {/* <!-- Sección 3 - Tabla de Autorizaciones Pendientes (disminuida para dispositivos pequeños) --> */}
            <div className="bg-white p-4 rounded-md">
              <h2 className="text-gray-500 text-lg font-semibold pb-4">
                Reported Users{" "}
              </h2>
              <div className="my-1"></div>
              {/* <!-- Espacio de separación --> */}
              <div className="bg-gradient-to-r from-blue-300 to-blue-500 h-px mb-6"></div>
              {/* <!-- Línea con gradiente --> */}
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-sm leading-normal">
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                      Picture
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                      Name
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                      Reported By{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Picture Perfil"
                        className="rounded-full h-10 w-10"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Juan Pérez
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Comercio
                    </td>
                  </tr>
                  {/* <!-- Añade más filas aquí como la anterior para cada autorización pendiente --> */}
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Picture Perfil"
                        className="rounded-full h-10 w-10"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      María Gómez
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Usuario
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Picture Perfil"
                        className="rounded-full h-10 w-10"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Carlos López
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Usuario
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Picture Perfil"
                        className="rounded-full h-10 w-10"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Laura Torres
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Comercio
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Picture Perfil"
                        className="rounded-full h-10 w-10"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Ana Ramírez
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Usuario
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Picture Perfil"
                        className="rounded-full h-10 w-10"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Luis Martínez
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      Comercio
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <!-- Botón "See All" para la tabla de Autorizaciones Pendientes --> */}
              <div className="text-right mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  See All
                </button>
              </div>
            </div>

            {/* <!-- Sección 4 - Tabla de Transacciones (disminuida para dispositivos pequeños) --> */}
            <div className="bg-white p-4 rounded-md mt-4">
              <h2 className="text-gray-500 text-lg font-semibold pb-4">
                Reported Posts{" "}
              </h2>
              {/* <div class="my-1"></div> <!-- Espacio de separación --> */}
              <div className="bg-gradient-to-r from-blue-300 to-blue-500 h-px mb-6"></div>
              {/* <!-- Línea con gradiente --> */}
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-sm leading-normal">
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                      Name
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                      Report Time
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">
                      Total Reports
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      Carlos Sánchez
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      27/07/2023
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">
                      1500
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      Ana Torres
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      28/07/2023
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">
                      2000
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      Juan Ramírez
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      29/07/2023
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">
                      1800
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      María Gómez
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      30/07/2023
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">
                      2100
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      Luis González
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      31/07/2023
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">
                      1700
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      Laura Pérez
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      01/08/2023
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">
                      2400
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      Pedro Hernández
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      02/08/2023
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">
                      1950
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      Sara Ramírez
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      03/08/2023
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">
                      1850
                    </td>
                  </tr>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      Daniel Torres
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      04/08/2023
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">
                      2300
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <!-- Botón "See All" para la tabla de Transacciones --> */}
              <div className="text-right mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  See All
                </button>
              </div>
            </div>
          </div>
   </div>
  );
};

export default AdminDashboard;
