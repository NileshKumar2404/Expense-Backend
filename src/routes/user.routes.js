import express from 'express'
import {registerUser, loginUser, refreshAccessToken} from '../controllers/user.controller.js'

const router = express.Router()

router.route("/register-user").post(registerUser)
router.route("/login-user").post(loginUser)
router.route("/refresh-access-token").patch(refreshAccessToken)

export default router