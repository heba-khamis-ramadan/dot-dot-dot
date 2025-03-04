import { defaultPublicId, defaultSecureURL, User } from "../../db/models/user.model.js";
import { decrypt } from "../../utils/crypto/index.js";
import { messages } from "../../utils/messages/index.js";
import cloudinary from "../../utils/file upload/cloud_config.js";

export const update_user = async (req, res, next) => {
    // get user data from req
    const userExistance = req.authUser;
    const id = userExistance.id;
    const {userName, bio, aboutMe} = req.body;
    const result = await User.findByIdAndUpdate(id, {userName, bio, aboutMe}, {new: true});
    // send response
    return res.status(201).json({success: true, message: messages.user.updatedSuccessfully, data: result}); 
};

export const upload_profile_pic_cloud = async (req, res, next) => {
    //delete old pic
    if(req.authUser.profilePic.public_id != defaultPublicId) {
        await cloudinary.uploader.destroy(req.authUser.profilePic.public_id);
    };
    // upload to cloud
    const {secure_url, public_id} = await cloudinary.uploader.upload(
        req.file.path, 
        {folder: `social-media-app/users/${req.authUser.id}/profile-pic`});
    // update database
    const result = await User.findByIdAndUpdate(req.authUser.id, {profilePic: {secure_url, public_id}}, {new: true});
    // send response
    return res.status(201).json({success: true, message: messages.user.updatedSuccessfully, data: result}); 
};

export const delete_profile_pic_cloud = async (req, res, next) => {
    //delete profile pic
    if(req.authUser.profilePic.public_id != defaultPublicId) {
        await cloudinary.uploader.destroy(req.authUser.profilePic.public_id);
    };
    //update with the default pic
    const result = await User.findByIdAndUpdate(req.authUser.id, 
        {profilePic: {secure_url: defaultSecureURL, public_id: defaultPublicId}}, 
        {new: true});
    // send response
    return res.status(201).json({success: true, message: messages.user.updatedSuccessfully, data: result}); 
};

export const get_user = async (req, res, next) => {
    // get user data from req
    const userExistance = req.authUser;
    // decrypt phone num
    userExistance.phone = decrypt({data: userExistance.phone});
    // send response
    return res.status(201).json({success: true, data: userExistance});
};

export const get_user_email = async (req, res, next) => {
    // get user data from req
    const email = req.query.email;
    const result = await User.findOne({email}).select("-_id userName bio aboutMe createdAt");
    if(!result) return res.status(404).json({success: false, message: messages.user.notFound});
    // send response
    return res.status(201).json({success: true, data: result});
};

export const get_user_name = async (req, res, next) => {
    // get user data from req
    const userName = req.query.userName;
    const result = await User.find({ userName: { $regex: userName, $options: "i" } }).select("-_id userName bio aboutMe createdAt");
    if(result.length<1) return res.status(404).json({success: false, message: messages.user.notFound});
    // send response
    return res.status(201).json({success: true, data: result});
};