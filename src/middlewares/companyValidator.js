import { hasRoles } from "./validate-roles.js"
import { validateJWT } from "./validate-jwt.js"
import { validateFields } from "./validate-fields.js"
import { handleErrors } from "./handleErrors.js"

export const createCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("rate").notEmpty().withMessage("Rate is required"),
    body("foundingYear").notEmpty().withMessage("Founding date is required"),
    body("category").notEmpty().withMessage("Category is required"),
    validateFields,
    handleErrors
]

export const updateCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").optional(),
    body("rate").optional(),
    body("foundingYear").optional(),
    body("category").optional(),
    validateFields,
    handleErrors
]