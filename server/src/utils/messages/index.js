const generateMessage = (entity) => {
    return {
        notFound: `${entity} not found :(`,
        alreadyExist: `${entity} already exist!!`,
        createdSuccessfully: `${entity} created successfully :)`,
        deletedSuccessfully: `${entity} deleted successfully :)`,
        updatedSuccessfully: `${entity} updated successfully :)`,
        failToCreate: `failed to create ${entity} :(`,
        failToDelete: `failed to delete ${entity} :(`,
        failToUpdate: `failed to update ${entity} :(`,
    }
};
export const messages = {
    user: {...generateMessage("user"), 
           invalidPassword: "invalid password!!", 
           loggedIn: "logged in successfully :)", 
           loggedOut: "logged out successfully :)"},
    email: {...generateMessage("email")},
    post: {...generateMessage("post")}
}