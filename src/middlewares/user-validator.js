8
import { emailExists, usernameExists, userExists, userIsDeleted } from "../helpers/db-validators.js"
import { validateFields } from "./validate-fields.js"
import { handleErrors } from "./handleErrors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js";
import { body, param } from 'express-validator';


export const registerValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("surname").notEmpty().withMessage("Surname is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("username").custom(usernameExists),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Not a valid email"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validateFields,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Not a valid email"),
    body("username").optional().isString().withMessage("Username is in the wrong format"),
    body("password").notEmpty(),
    validateFields,
    handleErrors
]

export const listValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
]

export const getUserByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateJWT,
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID"),
    param("uid").custom(userExists),
    validateFields,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("uid").optional().isMongoId().withMessage("Not a valid MongoDB ID"),
    body("uid").optional().custom(userExists).custom(userIsDeleted),
    validateFields,
    handleErrors
]