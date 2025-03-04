import fs from "fs";
import path from "path";
import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid/non-secure";

export const fileValidation = {
    images: ["image/png", "image/jpeg"]
}

export const cloudUpload = (allowedTypes) => {
    try {
        const storage = diskStorage({});

        //file filter layer
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