import PropTypes from "prop-types";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SearchButton = ({ searchInput, setSearchInput, setShowResults }) => {
  return (
    <>
      <div className="w-full  lg:w-1/5    relative ">
        <div className="flex gap-2 items-center    ">
          <input
            onChange={(e) => {
              setShowResults(true);
              setSearchInput(e.target.value);
            }}
            className="px-2 py-1 focus:outline-color-one bg-white  lg:block rounded-r-full rounded-l-full hover:cursor-text  text-white focus:cursor-text w-full border-2"
            type="text"
            placeholder="Search..."
          />
          <Link
            to={searchInput && `/search?query=${searchInput}`}
            className="absolute  text-color-one  right-0 py-2 px-6
             bg-gray-200 cursor-pointer rounded-l-full rounded-r-full"
          >
            <FaMagnifyingGlass />
          </Link>
        </div>
      </div>
    </>
  );
};

SearchButton.propTypes = {};

export default SearchButton;
