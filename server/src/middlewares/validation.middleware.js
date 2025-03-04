import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
import { Types } from "mongoose";

// Middleware to validate requests
export const isValid = (schema) => {
    return (req, res, next) => {
      const data = {...req.body, ...req.params, ...req.query};
      const result = schema.validate(data, {abortEarly: false});
      if (result.error) {
          let messages = result.error.details.map((obj) => {
            return obj.message;  
          });
          return next(new Error(messages, {cause:400}));
      }
      return next();
    };
};

// Middleware to validate Ids
export const isValidId = (value, helpers) => {
  if(!Types.ObjectId.isValid(value)) {
    return helpers.message("invalid Id!!!");
  }
  return true;
};

// Middleware to validate file type by magic number (file signatures)
export const fileValidate = (allowedTypes) => {
    return async (req, res, next) => {
        try {
          // get the file path
          const filePath = req.file.path;
          // read the file and return buffer
          const buffer = fs.readFileSync(filePath);
          // get the file type
          const type = await fileTypeFromBuffer(buffer);
          // validate
          if (!type || !allowedTypes.includes(type.mime))
            return next(new Error("invalid file type!!!"));
      
          return next();
        } catch (error) {
          return next(new Error("Internal server error"));
        }
      };
};