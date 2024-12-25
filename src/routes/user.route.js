import { Router } from "express";
import * as UserController from "../controllers/users.controller.js"
import { invokePassport } from "../middlewares/handleError.js";

const route = Router()

route.get('/', UserController.getUsers)
route.post('/', UserController.createUser)
route.get('/:uid', UserController.getUserById)
route.get('/email/:email', UserController.getUserByEmail)
route.post('/:uid', UserController.updateUser)
route.delete('/:uid', UserController.deleteUser)
route.post('/recoverPw', UserController.recoverPw)


export default route