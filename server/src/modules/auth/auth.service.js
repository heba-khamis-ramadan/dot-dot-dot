import { User } from "../../db/models/user.model.js";
import { compare, hash, encrypt, generate, messages  } from "../../utils/index.js";

export const signup = async (req, res, next) => {
    const {userName, email, password, phone, bio, aboutMe} = req.body;
    // create user
    const createdUser = await User.create({
        userName, 
        email, 
        password: hash({password}),
        phone: encrypt({data: phone}),
        bio,
        aboutMe
    });
    // send response
   return res.status(201).json({success: true, message: messages.user.createdSuccessfully, data: createdUser}); 
};

export const login = async (req, res, next) => {
    const {email, password} = req.body;
    // check email
    const userExistance = await User.findOne({email});
    if (!userExistance) {
        return next(new Error(messages.email.notFound, {cause: 404}));
    };
    // check password
    const passwordMatch = compare({password, hashedPasword: userExistance.password});
    if (!passwordMatch) {
        return next(new Error(messages.user.invalidPassword, {cause: 404}));
    };
    // change loggedout back to true
    const id = userExistance.id;
    if(userExistance.isLoggedout == true) {
        await User.findByIdAndUpdate(id, {isLoggedout: false});
    };
    // generate token
    const token = generate({payload: {email, id: userExistance.id}, options: {expiresIn: "1h"}});
    // send response
   return res.status(200).json({success: true, message: messages.user.loggedIn, token});
};

export const logout = async (req, res, next) => {
    // get user data from req
    const userExistance = req.authUser;
    const id = userExistance.id;
    await User.findByIdAndUpdate(id, {isLoggedout: true, LoggedoutAt: Date.now()});
    // send response
    return res.status(201).json({success: true, message: messages.user.loggedOut});
};