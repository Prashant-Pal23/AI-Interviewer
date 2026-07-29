import { useState } from "react";
import api from "../../services/api";

import useAuthStore from "../../store/useAuthStore";

const ProfileCard = ({ user, refreshProfile }) => {

    const [uploading, setUploading] = useState(false)

    const refreshAuthUser = useAuthStore((state) => state.refresh)

    const handleImageChange = async (e) => {
        const file = e.target.files[0]

        if (!file) return;
        try {
            setUploading(true);

            const formData = new FormData()
            formData.append("profilePic", file)

            const response = await api.put(
                "/users/profile/picture",
                formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            refreshAuthUser(response.data.data); // Navbar update hoga

            refreshProfile(); // Profile page update hoga

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Image upload failed."
            )

        } finally {
           setUploading(false);
        }
    }

    return (

        <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
                {
                    user.profilePic ? (
                        <img
                            src={user.profilePic}
                            alt={user.name}
                            className="w-32 h-32 rounded-full object-cover border"
                        />
                    ) : (
                        <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-32">
                                <span className="text-4xl">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    )
                }

                <label className="btn btn-outline btn-sm mt-4">
                    Change Picture
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </label>

                <h2 className="text-2xl font-bold mt-4">
                    {user.name}
                </h2>

                <p className="text-gray-500">
                    {user.email}
                </p>

                <div className="divider"></div>
                <div className="w-full space-y-3 text-left">
                    <p>
                        <strong>Age:</strong>{" "}
                        {user.age ?? "Not Added"}
                    </p>
                    <p>
                        <strong>Gender:</strong>{" "}
                        {user.gender ?? "Not Added"}
                    </p>
                    <p>
                        <strong>Preferred Role:</strong>{" "}
                        {user.preferredRole ?? "Not Added"}
                    </p>
                    <p>
                        <strong>Experience:</strong>{" "}
                        {user.experienceLevel ?? "Not Added"}
                    </p>
                    <p>
                        <strong>College:</strong>{" "}
                        {user.college ?? "Not Added"}
                    </p>
                    <div>
                        <strong>Skills:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {
                                user.skills.length > 0 ? (
                                    user.skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="badge badge-primary"
                                        >
                                            {skill}
                                        </div>
                                    ))
                                ) : (
                                    <span>No Skills Added</span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard