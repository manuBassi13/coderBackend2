import express from 'express'
import { AppInit } from './init/initialConfig.js'

const app = express()
AppInit(app)


const port = process.env.PORT
app.listen(port, () => {
    console.log('Servidor en ', port);    
})
