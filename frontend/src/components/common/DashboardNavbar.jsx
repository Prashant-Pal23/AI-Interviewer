import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const DashboardNavbar = () => {
    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <div className="navbar bg-base-100 shadow-md px-10">

            <div className="flex-1">

                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-primary"
                >
                    AI Interview
                </Link>

            </div>

            <div className="flex items-center gap-4">

                <p className="font-medium hidden md:block">
                    Welcome, {user?.name}
                </p>

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">

                            <img
                                src={
                                    user?.profilePic ||
                                    "https://ui-avatars.com/api/?name=User"
                                }
                                alt="profile"
                            />

                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >

                        <li>
                            <Link to="/profile">
                                Profile
                            </Link>
                        </li>

                        <li>
                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavbar;