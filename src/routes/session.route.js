import { Router } from "express";
import * as SessionController from "../controllers/sessions.controller.js"
import { invokePassport } from "../middlewares/handleError.js";

const route = Router()

route.post('/login', SessionController.login)
route.post('/logout', SessionController.logout)
route.get('/current', invokePassport('jwt'), (req, res) => {
    console.log(req.user);
    res.send('Bienvenido '+req.user.first_name)
})

export default route