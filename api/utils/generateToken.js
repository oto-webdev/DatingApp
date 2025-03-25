import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, 
        { expiresIn: "7d" }
    ); 

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return token
}

export default generateToken;