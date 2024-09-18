import { Router } from "express";
import { login, register, recoverPw } from "../controllers/user.controller.js"
import { invokePassport } from "../middlewares/handleError.js";

const app = Router()

app.post('/login', login)
app.post('/register', register)

app.post('/recoverPw', recoverPw)

app.get('/current', invokePassport('jwt'), (req, res) => {
    console.log(req.user);
    res.send('Bienvenido '+req.user.first_name)
})

export default app