const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");
/**
 * 
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 */
async function registerController(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await userModel.findOne({ $or: [{ name }, { email }] })
    if (userExists) {
        return res.status(400).json({ message: "Name or email already exists" });
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        name,
        email,
        password: hash
    })
    res.status(201).json({ message: "User registered successfully", user });

    const token = jwt.sign(
        { id: user._id, username: user.username }, process.env.jwt_secret, { expiresIn: "1d" });

    res.cookie("token", token)

    res.status(201).json({ message: "User registered successfully", user, token });
}

async function loginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const ispasswordCorrect = await bcrypt.compare(password, user.password);
    if (!ispasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.jwt_secret,
        { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "Login successful", user: {
            id: user._id, username: user.username, email: user.email
        }
    });
}

async function logoutController(req, res) {
    const token = req.cookies.token
    await tokenBlacklistModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
}
async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "User details  fetched successfully", user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
}
module.exports = { registerController, loginController, logoutController, getMeController }; 