import Joi from "joi";
import { ApiError } from "../utils/ApiError.js";

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  bio: Joi.string().required().max(500),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUserProfileSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  bio: Joi.string().max(500).optional(),
});



export const register = (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiError({ message: error.details[0].message }));
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError({ message: "Validation error", error: err.message }));
  }
};

export const login = (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiError({ message: error.details[0].message }));
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError({ message: "Validation error", error: err.message }));
  }
};

export const updateUserProfile = (req, res, next) => {
  try {
    const { error } = updateUserProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiError({ message: error.details[0].message }));
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError({ message: "Validation error", error: err.message }));
  }
};


