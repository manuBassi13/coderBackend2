import express from 'express'
import router from '../routes/index.js'
import { __dirname } from "../utils/utils.js"
import {connectionDB } from "../mongo/connection.js"
import passport from 'passport'
import initPassport from '../config/passport.config.js'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import { addLogger, logger } from '../utils/logger.js'

export const AppInit = (app) => {

    dotenv.config()
    
    connectionDB().then(() => {
        logger.info('Conectado a la base de datos => Mongo')
    })
    
    initPassport()
    
    passport.initialize()
    app.use(addLogger)
    app.use(cookieParser(process.env.SECRET))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/', router)
    
    
}
