import { Router } from "express";
import * as ProductsController from "../controllers/products.controller.js"
import { invokePassport } from '../middlewares/handleError.js'
import { handleAuth } from "../middlewares/handleAuth.js";

const route = Router()

route.get('/', ProductsController.getProducts)
route.post('/', invokePassport('jwt'), handleAuth('admin'), ProductsController.createProduct)
route.get('/:pid', ProductsController.getProductById)
route.get('/code/:code', ProductsController.getProductByCode)
route.put('/:pid', invokePassport('jwt'), handleAuth('admin'), ProductsController.updateProduct)
route.delete('/:pid', invokePassport('jwt'), handleAuth('admin'), ProductsController.deleteProduct)

export default route