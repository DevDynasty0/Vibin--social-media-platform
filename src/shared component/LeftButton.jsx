import { NavLink } from "react-router-dom";
const LeftButton = ({ name = "", path = "", icon: Icon, setLeft, left }) => {
  return (
    <div onClick={() => setLeft(!left)} className="mt-1">
      <NavLink
        to={path}
        // onClick={onHandleClick}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-2 py-2 gap-2 hover:bg-gray-100 rounded bg-gray-100 border-l-4 border-color-one"
            : "flex items-center px-2 py-2 gap-2 hover:bg-gray-100 rounded border-l-4 border-white"
        }
      >
        {Icon && (
          <span className="p-2  text-color-one rounded   text-center">
            <Icon size={"1.15rem"} />
          </span>
        )}
        {/* {img && <img className="h-12 w-12 rounded " src={img} />} */}
        {/* Render the icon if provided */}
        <div>
          <span className=" font-medium">{name}</span>
          <br />
          {/* {img && (
            <button className="px-1  gradient-one  text-white text-xs rounded-sm py-1 shadow">
              Add Friend
            </button>
          )} */}
        </div>
      </NavLink>
    </div>
  );
};

LeftButton.propTypes = {};

export default LeftButton;
