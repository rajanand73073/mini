import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const register = asyncHandler(async (req, res) => {
  try {
    const requestData = req.body;
    const existingUser = await User.findOne({ email: requestData.email });

    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const newUser = await User.create({
      name: requestData.name,
      email: requestData.email,
      password: requestData.password,
      bio: requestData.bio || "",
    });

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
      throw new ApiError(404, "User not found");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(
          200,
          {
            user: createdUser,
            token,
          },
          "User Registered Successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse({ success: false, message: error.message }));
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const requestData = req.body;
    const user = await User.findOne({ email: requestData.email });

    if (!user) {
      throw new ApiError(400, "User does not exist.");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(
      requestData.password
    );
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Incorrect password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const loggedInUser = await User.findById(user._id).select("-password");

    if (!loggedInUser) {
      throw new ApiError(404, "User not found");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, token },
          "User Logged In Successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse({ success: false, message: error.message }));
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("token", options)
      .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse({ success: false, message: error.message }));
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const [userDetails] = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "posts",
          pipeline: [
            {
              $project: {
                content: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          name: 1,
          bio: 1,
          email: 1,
          posts: 1,
        },
      },
    ]);

    if (!userDetails) {
      throw new ApiError(400, "User not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: userDetails },
          "User Profile Retrieved Successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse({ success: false, message: error.message }));
  }
});

export const getAuthorProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(400, "Invalid User ID");
    }

    const [authorDetails] = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "posts",
          pipeline: [
            {
              $project: {
                content: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          name: 1,
          bio: 1,
          email: 1,
          posts: 1,
        },
      },
    ]);

    if (!authorDetails) {
      throw new ApiError(404, "Author not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200,
          { user: authorDetails },
          "Author Profile Retrieved Successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse({ success: false, message: error.message }));
  }
});

export const update = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, bio },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      throw new ApiError(400, "User not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: updatedUser },
          "User Profile Updated Successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse({ success: false, message: error.message }));
  }
});
