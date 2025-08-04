import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { getIO } from "../socket.server.js";



export const create = asyncHandler(async (req, res) => {
  try {
    const requestData = req.body;
    const post = await Post.create({
      content: requestData.content,
      author: req.user._id,
    });

     const createdPost = await Post.findById(post._id)
      .populate("author", "name")
      .select("-__v -updatedAt");

    if (!post) {
      throw new ApiError(400, "Post creation failed");
    }

    const io = getIO();

    io.emit("newPost", {
      post: createdPost,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          post: createdPost,
        },
        "Post created successfully"
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error.message));
  }
});

export const getAll = asyncHandler(async (req, res) => {
  try {

      const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

      if(posts.length === 0) {
        return res.status(404).json(new ApiResponse(404, {}, "No posts found"));
      }

    return res
      .status(200)
      .json(new ApiResponse(200, { posts }, "Posts retrieved successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, error.message )
      );
  }
});

export const getById = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("author", "name");

    if (!post) {
      throw new ApiError(400, "Post not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { post }, "Post retrieved successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, error.message )
      );
  }
});

