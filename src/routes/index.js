import { Router } from "express"
import { ROUTE_PATH } from '../constants/routesPath.js'
import SessionRouter from './session.route.js'
import UserRouter from './user.route.js'
import ProductRouter from './product.route.js'
import CartRouter from './cart.route.js'
import CategoryRouter from './category.route.js'
import swaggerUiExpress from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc"
import { __dirname } from "../utils/utils.js"

const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:{
            title: 'Carrito CoderBackend2',
            description: 'Documentación del proyecto de carrito de compras realizado en Coder Backend 2'
        }
    },
    apis:[`${__dirname}/../docs/**/*.yaml`]
}

const spec = swaggerJSDoc(swaggerOptions)

const app = Router()

app.use(ROUTE_PATH.sessions, SessionRouter)
app.use(ROUTE_PATH.users, UserRouter)
app.use(ROUTE_PATH.products, ProductRouter)
app.use(ROUTE_PATH.carts, CartRouter)
app.use(ROUTE_PATH.categories, CategoryRouter)
app.use(ROUTE_PATH.documentation, swaggerUiExpress.serve, swaggerUiExpress.setup(spec))


export default app