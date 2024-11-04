import Cart from "../dao/classes/cart.dao.js"
import User from "../dao/classes/user.dao.js"
import Product from "../dao/classes/product.dao.js"

const CartService = new Cart()
const UserService = new User()
const ProductService = new Product()

export const getCarts = async (req, res) => {
    const result = await CartService.getCarts()
    if(!result) return res.status(500).json({status:'Error al buscar todos los carritos'})
    
        res.status(200).json({message: 'Ok', payload: result})
}

export const getCartById = async (req, res) => {
    const { cid } = req.params
    const cartFound = await CartService.getCartById(cid)
    if(!cartFound) return res.status(500).json({message: 'Carrito no encontrado'})

    res.status(200).json({message:'Carrito encontrado', payload: cartFound})
}

export const createCart = async (req, res) => {
    const {uid, products} = req.body
    const resultUser = await UserService.getUserById(uid)
    console.log(resultUser);
    if(!resultUser) return res.status(500).json({message:'Usuario no encontrado'})
    console.log(...products);
    
    let actualCart = await ProductService.getProductList(products)
    console.log(actualCart);
    let sum = actualCart.reduce((acc, prev) => {
        acc += prev.price
        return acc
    }, 0)
    let orderNumber = Date.now() + Math.floor(Math.random()*10000+1)
    let date = new Date().toJSON()
    const order = {
        code: orderNumber,
        purchaser: resultUser.email,
        purchase_datetime: date,
        status: 'pending',
        products: actualCart.map(product => product.title),
        amount: sum
    }
    console.log(order);
    

    return res.status(200).json({payload: order})

}

export const updateCart = async (req, res) => {
    
}

export const resolveCart = async (req, res) => {
    const { cid } = req.params

    const resultUser = await UserService.getUserById(cid.user)
    console.log(resultUser);
    if(!resultUser) return res.status(500).json({message:'Usuario no encontrado'})
    
    let actualCart = await ProductService.getProductList(cid.products)
    console.log(actualCart);

    let orderNumber = Date.now() + Math.floor(Math.random()*10000+1)
    let date = new Date().toJSON()
    const order = {
        code: orderNumber,
        purchaser: resultUser.email,
        purchase_datetime: date,
        status: 'completed',
        products: actualCart.map(product => product.title),
        amount: sum
    }
    console.log(order);


}