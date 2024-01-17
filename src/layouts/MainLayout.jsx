import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            {/* call here navbar */}
            <Outlet/>
        </div>
    );
};

export default MainLayout;