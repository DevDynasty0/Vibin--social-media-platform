import PropTypes from "prop-types";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchButton = ({ setSearchInput, setShowResults }) => {
  return (
    <>
      <div className="w-full   lg:w-2/5   relative ">
        <div className="flex gap-2 items-center    ">
          <input
            onChange={(e) => {
              setShowResults(true);
              setSearchInput(e.target.value);
            }}
            className="px-2 py-1 focus:outline-color-one   lg:block rounded-r-full rounded-l-full hover:cursor-text shadow drop-shadow text-black focus:cursor-text w-full border-2"
            type="text"
            placeholder="Search..."
          />
          <div className="lg:absolute lg:text-color-one lg:right-2 p-0.5 cursor-pointer">
            <FaMagnifyingGlass />
          </div>
        </div>
      </div>
    </>
  );
};

SearchButton.propTypes = {};

export default SearchButton;
