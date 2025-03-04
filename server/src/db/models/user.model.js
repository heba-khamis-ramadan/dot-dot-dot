import { Schema, model } from "mongoose";

// constants
export const roles = {
    USER: "user",
    ADMIN: "admin"
};

export const defaultProfilePic = "uploads/default.png";
export const defaultSecureURL= "https://res.cloudinary.com/dncl2sqt9/image/upload/v1738942169/default_ufqipq.png";
export const defaultPublicId= "default_ufqipq";

// schema
const userSchema = new Schema({
    email: {type: String, required: true, unique: [true, "email already exist"], lowercase: true},
    password: {type: String, required: true},
    userName: {type: String, required: true},
    phone: {type: String, required: true},
    bio: {type: String, required: false},
    aboutMe: {type: String, required: false},
    isConfirmed: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},
    isLoggedout: {type: Boolean, default: false},
    deletedAt: {type: Date},
    LoggedoutAt: {type: Date},
    passwordResetedAt: {type: Date},
    role: {type: String, enum: Object.values.roles, default: roles.USER},
    //profilePic: {type: String, default: defaultProfilePic} >> file-system
    profilePic: {secure_url: {type: String, default: defaultSecureURL}, 
                 public_id: {type: String, default: defaultPublicId}}
}, {
    timestamps: true,
});

// model
export const User = model("user", userSchema);