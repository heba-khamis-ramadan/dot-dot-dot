//=== async error handler ===//
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            return next(new Error(error.message));
        });
    };
};