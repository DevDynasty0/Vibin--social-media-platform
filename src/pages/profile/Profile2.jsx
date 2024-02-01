import React from 'react';

const Profile2 = () => {
  return (
    <div>
      <div className="p-relative h-screen bg-gray-900">
        <div className="flex justify-center">
          <header className="text-white h-auto">
            {/* Navbar (left side) */}
            <div className="w-64 overflow-y-auto fixed h-screen pr-3">
              {/* Logo */}
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-white ml-3"
                fill="currentColor"
              >
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>

              {/* Nav */}
              <nav className="mt-5 px-2">
                <a
                  href="#"
                  className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
                >
                  <svg
                    className="mr-4 h-6 w-6 "
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
                    ></path>
                  </svg>
                  Home
                </a>
                {/* Add other nav items similarly */}
              </nav>

              {/* User Menu */}
              <div className="absolute bottom-8">
                <div className="flex-shrink-0 flex hover:bg-gray-800 rounded-full px-4 py-3 mt-12 mr-2">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base leading-6 font-medium text-white">
                          ℜ??????ℜ??????.dev
                        </p>
                        <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                          @Ricardo_oRibeiro
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="ml-64 w-full">
            {/* User profile */}
            <div className="flex-shrink-0">
              <div className="bg-gray-800 p-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3">
                  <p className="text-lg leading-6 font-medium text-white">
                    ℜ??????ℜ??????.dev
                  </p>
                  <p className="text-sm leading-5 font-medium text-gray-400">
                    @Ricardo_oRibeiro
                  </p>
                  <p className="mt-1 text-sm leading-5 text-gray-300">
                    Building cool stuff with JavaScript and React.{' '}
                    <a href="#" className="text-blue-400 hover:underline">
                      www.example.com
                    </a>
                  </p>
                  <div className="mt-6 flex">
                    <div className="flex">
                      <span className="text-lg leading-5 font-medium text-white mr-2">
                        230
                      </span>
                      <span className="text-sm leading-5 font-medium text-gray-400">
                        Following
                      </span>
                    </div>
                    <div className="ml-6 flex">
                      <span className="text-lg leading-5 font-medium text-white mr-2">
                        105
                      </span>
                      <span className="text-sm leading-5 font-medium text-gray-400">
                        Followers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tweets */}
            <section className="mt-6">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-white">Tweets</h2>
              </div>

              {/* Sample Tweet */}
              <div className="mt-4">
                <div className="flex">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-base leading-6 font-medium text-white">
                      ℜ??????ℜ??????.dev
                      <span className="text-gray-400 ml-1">@Ricardo_oRibeiro</span>
                    </p>
                    <p className="text-sm leading-5 text-gray-400">
                      · 4h
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-white">
                  Loving the Tailwind CSS framework! 😍 #TailwindCSS
                </p>
                <div className="mt-4 flex">
                  <button className="text-gray-400 hover:text-blue-300">
                    <svg
                      className="h-6 w-6 "
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      ></path>
                    </svg>
                    <span className="ml-1">2</span>
                  </button>
                  <button className="ml-4 text-gray-400 hover:text-blue-300">
                    <svg
                      className="h-6 w-6 "
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    <span className="ml-1">3</span>
                  </button>
                </div>
              </div>
              {/* Add other tweets similarly */}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile2;
