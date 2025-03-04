import { Schema, Types , model } from "mongoose";

// schema
const postSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    userId: {type: Types.ObjectId, required: true, ref: "User"}
}, {
    timestamps: true,
});

// model
export const Post = model("post", postSchema);