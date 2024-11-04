import { Router } from "express";
import * as CategoryController  from "../controllers/category.controller.js"

const route = Router()

route.get('/', CategoryController.getCategories)
route.post('/', CategoryController.createCategory)
route.get('/:catid', )
route.post('/:catid', )


export default route