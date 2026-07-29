import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import useAuthStore from "../../store/useAuthStore";

const Login = () => {
    const navigate = useNavigate()

    const login = useAuthStore((state) => state.login)

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [toast, setToast] = useState(null)

    useEffect(() => {
        if (toast) {
            const timerId = setTimeout(() => {
                setToast(null);
            }, 3000);

            return () => clearTimeout(timerId);
        }
    }, [toast])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setToast({
                message: "Please fill all fields",
                type: "error",
            });
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/auth/login", formData)

            login(
                response.data.data.user,
                response.data.data.token
            );

            setToast({
                message: "Login Successful",
                type: "success",
            });


            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (error) {

            setToast({
                message:
                    error.response?.data?.message ||
                    "Login Failed",
                type: "error",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero min-h-[90vh]  ">

            <div className="card w-[450px] shadow-2xl">

                <div className="card-body p-10">

                    <h1 className="text-4xl font-bold text-center">
                        Welcome Back
                    </h1>

                    <p className="text-center text-base-content/70 mt-2 mb-6">
                        Login to continue your AI interview journey
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-control mb-5">
                            <label className="label">
                                <span className="label-text">
                                    Email
                                </span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control mb-5">
                            <label className="label">
                                <span className="label-text">
                                    Password
                                </span>
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging In..." : "Login"}
                        </button>

                    </form>

                    <p className="text-center mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary font-semibold"
                        >
                            Register
                        </Link>
                    </p>

                </div>

            </div>

            {toast && (
                <div className="toast toast-end">

                    <div
                        className={`alert ${
                            toast.type === "success"
                                ? "alert-success"
                                : "alert-error"
                        }`}
                    >
                        <span>{toast.message}</span>
                    </div>

                </div>
            )}

        </div>
    )
}

export default Login;