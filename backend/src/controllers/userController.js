import { changePassword, getProfile, updateProfile, uploadProfilePic } from "../services/userService.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await getProfile(req.id);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

export const updateUserProfile = async (req, res) => {
    try{
        const updatedUser = await updateProfile(req.id, req.body)

        return res.status(200).json({
            success: true,
            message: "Provide updated successfully",
            data: updatedUser,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const changeUserPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        await changePassword( req.id, currentPassword, newPassword)

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const uploadProfilePicture = async (req, res) => {
    try {
        const updatedUser = await uploadProfilePic(
            req.id,
            req.file
        )

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: updatedUser,
        })
    } catch (error) {

        console.error("Upload Profile Error:", error);
        
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}