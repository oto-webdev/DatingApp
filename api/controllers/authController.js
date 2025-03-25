import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, age, gender, genderPreference } = req.body;
        if (!name || !email || !password || !age || !gender || !genderPreference) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (age < 18) {
            return res.status(400).json({ message: "Age should be greater than 18" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters" });
        }

        if (!email.includes("@")) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            age,
            gender,
            genderPreference,
        });

        const token = generateToken(newUser._id, res);

        await newUser.save();

        return res.status(201).json({ message: "User created successfully", user: newUser, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const signin = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "User does not exist"});
        }

        const isMatch = await user.matchesPassword(password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = generateToken(user._id, res);

        return res.status(200).json({message: "User signed in successfully", user, token});
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

export const signout = async (req, res) => {
    try{
        res.clearCookie("jwt");
        return res.status(200).json({message: "User signed out successfully"});
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

export const getMe = async (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}