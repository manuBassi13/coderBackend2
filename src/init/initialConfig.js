import express from 'express'
import router from '../routes/index.js'
import { __dirname } from "../utils.js"
import { create } from "express-handlebars"
import {connectionDB } from "../mongo/connection.js"
import passport from 'passport'
import initPassport from '../config/passport.config.js'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"

export const AppInit = (app) => {
    dotenv.config()
    connectionDB()
    const hbs = create()

    initPassport()
    passport.initialize()
    app.use(cookieParser(process.env.SECRET))
    app.engine('handlebars', hbs.engine)
    app.set('views', __dirname + '/views')
    app.set('view engine', 'handlebars')
    app.use(express.static(__dirname+'/public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/', router)
    
}
