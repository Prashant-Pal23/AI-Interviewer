import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const Register = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [toast, setToast] = useState(null)

    useEffect(() => {
        if (toast) {
            const timerId = setTimeout(() => {
                setToast(null);
            }, 3000)

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
        e.preventDefault()
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setToast({
                message: "Please fill all fields",
                type: "error",
            })
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setToast({
                message: "Passwords do not match",
                type: "error",
            })
            return
        }

        try {
            setLoading(true);

            await api.post("/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })

            setToast({
                message: "Registration Successful",
                type: "success",
            })

            setTimeout(() => {
                navigate("/login");
            }, 1500)
        } catch (error) {
            setToast({
                message:
                    error.response?.data?.message ||
                    "Registration Failed",
                type: "error",
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="hero min-h-[90vh] bg-base-200 ">
            <div className="card w-[450px] bg-base-100 shadow-2xl">
                <div className="card-body p-10">

                    <h1 className="text-4xl font-bold text-center">
                        Create Account
                    </h1>
                    <p className="text-center text-base-content/70 mt-2 mb-6">
                        Start your AI interview journey
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-control mb-5">
                            <label className="label">
                                <span className="label-text">
                                    Name
                                </span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

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

                        <div className="form-control mb-5">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className="input input-bordered w-full"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>

                    </form>

                    <p className="text-center mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary font-semibold"
                        >
                            Login
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

export default Register