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
    if(!resultUser) return res.status(500).json({message:'Usuario no encontrado'}) 
    
    let actualCart = await ProductService.getProductList(pids)
    console.log("actualCart: ",actualCart);
    
    let sum = actualCart.reduce((acc, prev) => {
        acc += prev.price
        return acc
    }, 0)
    
    const cart = {
        user: resultUser._id,
        status: 'pending',
        products: products,
        amount: sum
    }
    
    const cartResult = await CartService.createCart(cart)
    if(!cartResult) return res.status(500).json({message: "Error al crear carrito. ", e})
    
    return res.status(200).json({payload: cart})

}

export const updateCart = async (req, res) => {
    
}

export const resolveCart = async (req, res) => {
    const { cid } = req.params
    const cartFound = await CartService.getCartById(cid)
    
    const resultUser = await UserService.getUserById(cartFound.user)
    if(!resultUser) return res.status(500).json({message:'Usuario no encontrado'})
    const cartProds = cartFound.products.map(products => products.product)


    let orderNumber = Date.now() + Math.floor(Math.random()*10000+1)
    let date = new Date().toJSON()
    const order = {
        code: orderNumber,
        purchaser: resultUser.email,
        purchase_datetime: date,
        status: 'completed',
        products: cartProds.map(product => product.title),
        amount: cartFound.amount
    }

    return res.status(200).json({payload: order})
}