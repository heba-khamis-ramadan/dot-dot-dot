import { Post } from "../../db/models/post.model.js";
import { messages } from "../../utils/messages/index.js";
//import { User } from "../../db/models/user.model.js";

export const create_post = async (req, res, next) => {
    // get user data from req
    const userExistance = req.authUser;
    const userId = userExistance.id;
    const { title, content} = req.body;
    const result = await Post.create({title, content, userId});
    // send response
    return res.status(201).json({success: true, message: messages.post.createdSuccessfully, data: result }); 
};

export const update_post = async (req, res, next) => {
    // get user data from req
    const userExistance = req.authUser;
    const userId = userExistance.id;
    const id = req.params.id;
    const { title, content} = req.body;
    const result = await Post.findOneAndUpdate({userId, _id:id}, {title, content}, { new: true });
    if(!result) return res.status(404).json({success: false, message: messages.post.notFound});
    // send response
    return res.status(201).json({success: true, message: messages.post.updatedSuccessfully, data: result }); 
};

export const delete_post = async (req, res, next) => {
    // get user data from req
    const userExistance = req.authUser;
    const userId = userExistance.id;
    const id = req.params.id;
    const result = await Post.deleteOne({userId, _id:id});
    if(!result.deletedCount) return res.status(404).json({success: false, message: messages.post.notFound});
    // send response
    return res.status(201).json({success: true, message: messages.post.deletedSuccessfully, data: result });
};

export const get_posts = async (req, res, next) => {
    // get user data from req
    const userExistance = req.authUser;
    const userId = userExistance.id;
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const result = await Post.find({userId}).limit(limit).skip(skip).sort({"createdAt":-1});
    // send response
    return res.status(200).json({success: true, data: result });
};

export const get_post_title = async (req, res, next) => {
    // get user data from req
    const userExistance = req.authUser;
    const title = req.query.title;
    const result = await Post.aggregate([
        { $match: { title } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userInfo",
            },
        },
        {
            $project: {
                _id: 0,
                title: 1,
                content: 1,
                createdAt: 1,
                "userInfo.userName": 1,
                "userInfo.profilePic.secure_url": 1,
            },
        },
    ]);
    if(result.length<1) return res.status(404).json({success: false, message: messages.post.notFound});
    // send response
    return res.status(200).json({success: true, data: result }); 
};

export const get_post_content = async (req, res, next) => {
    // get user data from req
    const userExistance = req.authUser;
    const content = req.query.content;
    const result = await Post.aggregate([
        { $match: { content: { $regex: content, $options: "i" } } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userInfo",
            },
        },
        {
            $project: {
                _id: 0,
                title: 1,
                content: 1,
                createdAt: 1,
                "userInfo.userName": 1,
                "userInfo.profilePic.secure_url": 1,
            },
        },
    ]);
    if(result.length<1) return res.status(404).json({success: false, message: messages.post.notFound});
    // send response
    return res.status(200).json({success: true, data: result }); 
};