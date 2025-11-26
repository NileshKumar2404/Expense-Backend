import { User } from '../models/user.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asynHandler.js'
import jwt from 'jsonwebtoken'

const generateAccessTokenandRefreshToken = async function(userID) {
    try {
        const user = await User.findById(userID)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(401, "Failed to generate access token and refresh token.")
    }
}

export const registerUser = asyncHandler(async (req, res) => {
    try {
        const {name, email, password} = req.body

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res
            .status(400)
            .json(new ApiResponse(
                400, {}, "These fields are required"
            ))
        }

        const existingUser = await User.find({email: email.toLowerCase()})
        if (!existingUser) {
            return res
            .status(400)
            .json(new ApiResponse(
                400, {}, "Email is already registered"
            ))
        }

        const newUser = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password.trim()
        })

        const {accessToken, refreshToken} = await generateAccessTokenandRefreshToken(newUser._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        const safeUser = await User.findById(newUser._id).select('-password -refreshToken')

        return res
        .status(201)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(
            201,
            {
                safeUser,
                token: {accessToken, refreshToken}
            },
            "User registered successfully"
        ))
    } catch (error) {
        console.error("Failed to register user: ", error);
        throw new ApiError(401, "Failed to register user" || error.message)
    }
})

export const loginUser = asyncHandler(async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email?.trim() || !password?.trim()) {
            return res
            .status(400)
            .json(new ApiResponse(
                400, {}, "Email and passwords are required"
            ))
        }

        const user = await User.findOne({email: email.toLowerCase()})
        if(!user) {
            return res
            .status(400)
            .json(new ApiResponse(
                400, {}, "User not registered! please register the user first"
            ))
        }

        const checkPass = await user.isPasswordCorrect(password)
        if(!checkPass) {
            return res
            .status(400)
            .json(new ApiResponse(
                400, {}, "Wrong password!!"
            ))
        }

        const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

        const {accessToken, refreshToken} = await generateAccessTokenandRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            201,
            {
                loggedInUser,
                token: {accessToken, refreshToken}
            },
            "User logged in successfully"
        ))
    } catch (error) {
        console.error("Failed to login user: ", error);
        throw new ApiError(401, "Failed to login user")
    }
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.body?.refreshToken || req.cookies?.refreshToken
        console.log("Incoming token: ", incomingRefreshToken);
        
        if(!incomingRefreshToken) throw new ApiError(401, "Unauthorized access");

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        console.log("Decoded refresh token: ", decodedToken);

        const user = await User.findById(decodedToken._id)
        if(!user) throw new ApiError(401, "Refresh token expired");

        if(!user?.refreshToken) {
            throw new ApiError(401, "No refresh token stored")
        }

        const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true
        }
        return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            201,
            {accessToken, refreshToken},
            "Access token refreshed."
        ))
    } catch (error) {
        console.error("Failed to refresh access token: ", error);
        throw new ApiError(401, "Failed to refresh access token")
    }
})