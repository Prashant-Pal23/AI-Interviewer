import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({ user, refreshProfile }) => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        preferredRole: "",
        experienceLevel: "",
        college: "",
        skills: "",
    })

    useEffect(() => {

        if (!user) 
            return;

        setFormData({
            name: user.name || "",
            age: user.age || "",
            gender: user.gender || "",
            preferredRole: user.preferredRole || "",
            experienceLevel: user.experienceLevel || "",
            college: user.college || "",
            skills: user.skills?.join(", ") || "",
        })

    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await api.put("/users/profile/update", {
                ...formData,

                age: formData.age
                    ? Number(formData.age)
                    : null,

                skills: formData.skills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(Boolean),
            })
            alert("Profile updated successfully")
            refreshProfile()

            navigate("/dashboard")
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update profile"
            )
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">

                <h2 className="card-title text-2xl">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4" >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input input-bordered w-full"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        className="input input-bordered w-full"
                        value={formData.age}
                        onChange={handleChange}
                    />

                    <select
                        name="gender"
                        className="select select-bordered w-full"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                    </select>

                    <input
                        type="text"
                        name="preferredRole"
                        placeholder="Preferred Role"
                        className="input input-bordered w-full"
                        value={formData.preferredRole}
                        onChange={handleChange}
                    />

                    <select
                        name="experienceLevel"
                        className="select select-bordered w-full"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                    >
                        <option value="">Select Experience</option>
                        <option>Student</option>
                        <option>Fresher</option>
                        <option>1-2 Years</option>
                        <option>3-5 Years</option>
                        <option>5+ Years</option>
                    </select>

                    <input
                        type="text"
                        name="college"
                        placeholder="College"
                        className="input input-bordered w-full"
                        value={formData.college}
                        onChange={handleChange}
                    />

                    <textarea
                        name="skills"
                        placeholder="React, Node, Express"
                        className="textarea textarea-bordered w-full"
                        value={formData.skills}
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditProfileForm;