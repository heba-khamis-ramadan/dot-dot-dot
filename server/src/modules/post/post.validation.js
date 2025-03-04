import joi from "joi";
import {isValidId} from "../../middlewares/validation.middleware.js"

export const create_post = joi.object({
    title: joi.string().min(1).max(150).required(),
    content: joi.string().min(1).max(250).required()
}).required();

export const update_post = joi.object({
    id: joi.custom(isValidId),
    title: joi.string().min(1).max(150),
    content: joi.string().min(1).max(250)
}).required();

export const delete_post = joi.object({
    id: joi.custom(isValidId)
}).required();