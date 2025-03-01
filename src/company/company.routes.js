import { Router } from "express";
import { createCompanyValidator, updateCompanyValidator } from "../middlewares/companyValidator"
import { createCompany, updateCompany } from "./company.controller";

const router = Router()

router.post("/createCompany", createCompanyValidator, createCompany)

router.put("/updateCompany", updateCompanyValidator, updateCompany)

export default router