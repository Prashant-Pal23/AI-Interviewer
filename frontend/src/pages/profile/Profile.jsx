import { useEffect, useState } from "react";
import api from "../../services/api";

import ProfileCard from "../../components/profile/ProfileCard";
import EditProfileForm from "../../components/profile/EditProfileForm";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";

const Profile = () => {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    const fetchProfile = async () => {
        try {
            const response = await api.get("/users/profile")
            setUser(response.data.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    if (loading) {
        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-200 p-8">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">

                <ProfileCard user={user} refreshProfile={fetchProfile} />

                <EditProfileForm user={user} refreshProfile={fetchProfile} />

                <ChangePasswordForm />
            </div>
        </div>
    )
}

export default Profile