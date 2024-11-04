import { Router } from "express";
import * as CartController from "../controllers/carts.controller.js"
import { invokePassport } from "../middlewares/handleError.js";
import { handleAuth } from "../middlewares/handleAuth.js";

const route = Router()

route.get('/', CartController.getCarts)
route.post('/', CartController.createCart)
route.get('/:cid', CartController.getCartById)
route.post('/:cid', CartController.updateCart)
route.post('/:cid/purchase', CartController.resolveCart)



export default route