import { Link, useLocation } from "react-router-dom";

const HomeNavbar = () => {
    const location = useLocation()

    return (
        <div className="navbar bg-base-100 shadow-md px-10">

            <div className="flex-1">
                <Link
                    to="/"
                    className="text-2xl font-bold text-primary"
                >
                    AI Interview
                </Link>
            </div>

            <div className="flex-none gap-2">

                {location.pathname !== "/" && (
                    <Link to="/" className="btn btn-ghost">
                        Home
                    </Link>
                )}

                {location.pathname !== "/login" && (
                    <Link to="/login" className="btn btn-ghost">
                        Login
                    </Link>
                )}

                {location.pathname !== "/register" && (
                    <Link to="/register" className="btn btn-primary">
                        Register
                    </Link>
                )}

            </div>

        </div>
    );
};

export default HomeNavbar;