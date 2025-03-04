import joi from "joi";

export const signup = joi.object({
    userName: joi.string().min(2).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi.string().required(),
    bio: joi.string().min(1).max(150),
    aboutMe: joi.string().min(1).max(250)
}).required();

export const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
}).required();