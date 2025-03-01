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

export const generateCompaniesReport = async (req, res) => {
  try {
    const companies = await Company.find({ status: true })

    if (!companies.length) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      })
    }

    const currentYear = new Date().getFullYear()

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Companies")

    worksheet.columns = [
      { header: "Name", key: "name", width: 50 },
      { header: "Impact level", key: "rate", width: 50 },
      { header: "Trajectory", key: "yearsTrajectory", width: 50 },
      { header: "Category", key: "category", width: 50 },
    ]

    companies.forEach((company) => {
      worksheet.addRow({
        name: company.name,
        rate: company.rate,
        yearsTrajectory: currentYear - company.foundingYear,
        category: company.category,
      })
    })

    const reportsDir = path.join(process.cwd(), "reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const filePath = path.join(reportsDir, "Company_Report.xlsx");
    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, "Company_Report.xlsx", () => fs.unlinkSync(filePath));
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error generating",
      error: err.message,
    })
  }
}