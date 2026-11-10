const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authRouter = Router();
const authMiddleware = require("../middleware/auth.middleware");
/** 
* @route POST /api/auth/register
* @description Register a new user
* @access Public
*/
authRouter.post('/register', authController.registerController);
/**
* @route POST /api/auth/login
* @description Login a user
* @access Public
*/
authRouter.post('/login', authController.loginController);

authRouter.get('/logout',authController.logoutController);
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController);
module.exports = authRouter;