import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

import { createUser, findUserByEmail } from "../repositories/userRepository.js";

export const registerUser = async (userData) => {
    const { name, email, password } = userData;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({ name, email, password: hashedPassword,});

    return {userId: newUser._id, name:newUser.name, email: newUser.email}
    };

export const loginUser = async (email, password) => {

    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user._id);

    return { token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic,
        },
    }
}