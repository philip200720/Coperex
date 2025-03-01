import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";
import { createCompanyValidator, updateCompanyValidator } from "../middlewares/companyValidator.js";
import { createCompany, updateCompany, generateCompaniesReport } from "./company.controller.js";

const router = Router();

/**
 * @swagger
 * /coperex/v1/companies/createCompany:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the company.
 *               rate:
 *                 type: number
 *                 enum: [1, 2, 3, 4, 5]
 *                 description: The rating of the company.
 *               foundingYear:
 *                 type: number
 *                 description: The founding year of the company.
 *               category:
 *                 type: string
 *                 enum: [PRIMARY, SECONDARY, TERTIARY, QUATERNARY]
 *                 description: The category of the company.
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/createCompany", createCompanyValidator, createCompany);

/**
 * @swagger
 * /coperex/v1/companies/updateCompany:
 *   put:
 *     summary: Update an existing company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The unique identifier of the company.
 *               name:
 *                 type: string
 *                 description: The name of the company.
 *               rate:
 *                 type: number
 *                 enum: [1, 2, 3, 4, 5]
 *                 description: The rating of the company.
 *               foundingYear:
 *                 type: number
 *                 description: The founding year of the company.
 *               category:
 *                 type: string
 *                 enum: [PRIMARY, SECONDARY, TERTIARY, QUATERNARY]
 *                 description: The category of the company.
 *     responses:
 *       200:
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
router.put("/updateCompany", updateCompanyValidator, updateCompany);

/**
 * @swagger
 * /coperex/v1/companies/generateReport:
 *   get:
 *     summary: Generate and download the company report
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 reportUrl:
 *                   type: string
 *       500:
 *         description: Error generating report
 */
router.get("/generateReport", validateJWT, hasRoles("ADMIN_ROLE"), generateCompaniesReport);

export default router;