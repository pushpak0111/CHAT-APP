import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // not accessible to client-side scripts.
        sameSite: "strict", // helps prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development", // use secure cookies in production
    });
    return token;
}