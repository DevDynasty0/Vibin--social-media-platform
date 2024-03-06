import React from "react";
import PropTypes from "prop-types";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SearchUserCard from "./components/SearchUserCard";
import { useLocation } from "react-router-dom";
import { useGetSearchResultQuery } from "../../redux/features/user/userApi";
import AllPosts from "../../shared component/AllPosts";
const SearchResult = () => {
  const location = useLocation();
  console.log(location.search);
  console.log(location.search.split("=")[1].replace("%20", " "));

  const {
    data: searchResults,
    isLoading,
    isSuccess,
    refetch: searchRefetch,
  } = useGetSearchResultQuery(
    location?.search?.split("=")[1].replace("%20", " ")
  );

  return (
    <div className="max-w-[650px] mx-auto">
      <Tabs variant="enclosed-colored" colorScheme="pink" size={"lg"}>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Vibes</Tab>
          <Tab>Videos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {searchResults?.users?.length > 0 ? (
              searchResults.users
                ?.slice(0, 5)
                ?.map((user) => <SearchUserCard key={user?._id} user={user} />)
            ) : (
              <p>No User Found</p>
            )}
          </TabPanel>
          <TabPanel>
            {searchResults?.posts?.length > 0 ? (
              <AllPosts
                posts={searchResults.posts}
                isLoading={isLoading}
                isSuccess={isSuccess}
                postsRefetch={searchRefetch}
              />
            ) : (
              <p>No posts mathched</p>
            )}
            {/* {searchResults?.posts?.length > 0 ? (
              searchResults.posts
                ?.slice(0, 5)
                ?.map((post) => <PostCard key={post?._id} post={post} />)
            ) : (
              <p>No posts mathched</p>
            )}  */}
          </TabPanel>
          <TabPanel>
            {searchResults?.posts?.length > 0 ? (
              <AllPosts
                posts={searchResults.posts.filter(
                  (post) => post.contentType == "video"
                )}
                isLoading={isLoading}
                isSuccess={isSuccess}
                postsRefetch={searchRefetch}
              />
            ) : (
              <p>No videos mathched</p>
            )}{" "}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

SearchResult.propTypes = {};

export default SearchResult;
