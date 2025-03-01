'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import companyRoutes from "../src/company/company.routes.js"
import userRoutes from "../src/user/user.routes.js"
import authRoutes from "../src/auth/auth.routes.js"
import { createDefaultAdmin } from "../src/user/user.controller.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }))
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Coperex API',
        version: '1.0.0',
        description: 'API documentation for Coperex system',
      },
    },
    apis: ['./src/auth/auth.routes.js', './src/user/user.routes.js', './src/company/company.routes.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);


const routes = (app) => {
    app.use('/coperex/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use("/coperex/v1/company", companyRoutes);
    app.use("/coperex/v1/auth", authRoutes);
    app.use("/coperex/v1/user", userRoutes);
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = async () => {
    const app = express()
    try{
        middlewares(app)
        await conectarDB()
        await createDefaultAdmin()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}
