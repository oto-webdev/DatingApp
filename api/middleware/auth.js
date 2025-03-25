import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({message: "Not authorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({message: "Not authorized"});
        }

        const currentUser = await User.findById(decoded.id);
        req.user = currentUser;
        next();
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

export {
    protect
}