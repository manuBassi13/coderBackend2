import { Router } from "express"
import { ROUTE_PATH } from '../constants/routesPath.js'
import SessionRouter from './session.route.js'
import UserRouter from './user.route.js'
import ProductRouter from './product.route.js'
import CartRouter from './cart.route.js'
import CategoryRouter from './category.route.js'

const app = Router()

app.use(ROUTE_PATH.sessions, SessionRouter)
app.use(ROUTE_PATH.users, UserRouter)
app.use(ROUTE_PATH.products, ProductRouter)
app.use(ROUTE_PATH.carts, CartRouter)
app.use(ROUTE_PATH.categories, CategoryRouter)

export default app