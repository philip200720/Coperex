import { Router } from "express";
import { createCompanyValidator } from "../middlewares/companyValidator"
import { createCompany } from "./company.controller";

const router = Router()

router.post("/createCompany", createCompanyValidator, createCompany)

router.put("/updateCompany", )

export default router