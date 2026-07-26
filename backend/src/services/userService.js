import bcrypt from "bcryptjs";

import { findUserById, findUserByIdAndUpdate, findUserByIdWithPassword, updatePassword } from "../repositories/userRepository.js";

export const getProfile = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

export const updateProfile = async (userId, profileData) => {

    const user = await findUserById(userId)

    if(!user) {
        throw new Error("User not found");
    }

    const {
        name,
        age,
        gender,
        preferredRole,
        experienceLevel,
        college,
        skills,
    } = profileData;

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (age !== undefined) updates.age = age;
    if (gender !== undefined) updates.gender = gender;
    if (preferredRole !== undefined) updates.preferredRole = preferredRole;
    if (experienceLevel !== undefined)
        updates.experienceLevel = experienceLevel;
    if (college !== undefined) updates.college = college;
    if (skills !== undefined) updates.skills = skills;

    if (Object.keys(updates).length === 0) {
        throw new Error("No fields provided to update");
    }

    const updatedUser = await findUserByIdAndUpdate(userId, updates)

    return updatedUser
}

export const changePassword = async ( userId, currentPassword, newPassword) => {

    const user = await findUserByIdWithPassword(userId)

    if(!user) {
        throw new Error("User not found");
    }

    if (currentPassword === newPassword) {
        throw new Error(
            "New password must be different from current password"
        );
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password)

    if(!isMatch) {
        throw new Error("Current password is incorrect")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await updatePassword(userId, hashedPassword);

    return;
}