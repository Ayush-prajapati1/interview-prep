const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if(!token){
        return  res.status(401).json({
            message:"token not found"
        })
    }
    try {
        const blacklistedToken = await tokenBlacklistModel.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({
                message: "token is blacklisted"
            });
        }

        req.user = jwt.verify(token, process.env.jwt_secret);
        next();
    } catch (err) {
        return res.status(401).json({
            message: "invalid token"
        });
    }
}
module.exports = { authUser };