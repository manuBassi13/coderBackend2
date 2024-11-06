import { Router } from "express";
import * as SessionController from "../controllers/sessions.controller.js"
import { invokePassport } from "../middlewares/handleError.js";
import { UserSensitiveDataDTO } from "../dto/user.dto.js";

const route = Router()

route.post('/login', SessionController.login)
route.post('/logout', SessionController.logout)
route.get('/current', invokePassport('jwt'), (req, res) => {
    const userData = new UserSensitiveDataDTO(req.user)
    console.log(userData);
    res.send('Bienvenido '+req.user.first_name)
})

export default route