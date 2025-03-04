import fs from "fs";
import path from "path";
import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid/non-secure";

export const fileValidation = {
    images: ["image/png", "image/jpeg"]
}

export const fileUpload = (allowedTypes, folder) => {
    try {
        const storage = diskStorage({
            destination: (req, file, cb) => {
                const fullPath = path.resolve(`${folder}/${req.authUser.id}`);
                fs.mkdirSync(fullPath, {recursive: true});
                cb(null, `${folder}/${req.authUser.id}`);
            }, 
            filename: (req, file, cb) => {
                cb(null, nanoid() + file.originalname);
            }});
        const fileFilter = (req, file, cb) => {
            if( !allowedTypes.includes(file.mimetype) ) {
                return cb(new Error("invalid file type!!!"), false);
            };
            return cb(null, true);
        };
        const upload = multer({ storage, fileFilter });
        return upload;
      } catch (error) {
        return next(new Error("Internal server error"));
      }
};