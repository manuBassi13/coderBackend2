import { Router } from "express";
import * as UserController from "../controllers/users.controller.js"
import { invokePassport } from "../middlewares/handleError.js";

const route = Router()

route.get('/', UserController.getUsers)
route.post('/', UserController.createUser)
route.get('/:uid', UserController.getUserById)
route.post('/:uid', UserController.updateUser)

route.post('/recoverPw', UserController.recoverPw)

route.get('/current', invokePassport('jwt'), (req, res) => {
    console.log(req.user);
    res.send('Bienvenido '+req.user.first_name)
})

export default route