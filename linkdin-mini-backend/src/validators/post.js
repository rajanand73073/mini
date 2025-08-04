import Joi from "joi";
import { ApiError } from "../utils/ApiError.js";

const createPostSchema = Joi.object({
  content: Joi.string().required(),
});

export const create = (req, res, next) => {
  try {
    const { error } = createPostSchema.validate(req.body);
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
