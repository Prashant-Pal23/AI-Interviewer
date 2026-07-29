import { useState } from "react";
import api from "../../services/api";

const ChangePasswordForm = () => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return
        }

        try {
            setLoading(true)

            await api.put("/users/change/password", {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            })

            alert("Password changed successfully.");

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to change password."
            )
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl">
                    Change Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        className="input input-bordered w-full"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        className="input input-bordered w-full"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        className="input input-bordered w-full"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Changing..."
                                : "Change Password"
                        }
                    </button>

                </form>
            </div>
        </div>
    )
}

export default ChangePasswordForm