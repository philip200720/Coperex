import Company from "./company.model.js"
import ExcelJS from "exceljs"
import fs from "fs"
import path from "path";

export const createCompany = async (req, res) => {
    try {
        const { name, rate, foundingYear, category } = req.body 

        const newCompany = new Company({
            name,
            rate,
            foundingYear,
            category
        })

        await newCompany.save();

        return res.status(201).json({
            success: true,
            message: "Company saved",
            company: newCompany,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error saving company",
            error: err.message,
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
      const { id } = req.params
      const data = req.body
  
      const company = await Company.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  
      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Company updated",
        company,
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error updating company",
        error: err.message,
      })
    }
  }