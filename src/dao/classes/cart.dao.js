import { CartModel } from "../models/cart.model.js"

export default class Cart {
    
    getCarts = async () => {
        try{
            return await CartModel.find()
        } catch (e){
            console.log(e);
            return null
        }
    }

    getCartById = async (id) => {
        try{
            return await CartModel.findOne({_id: id})
        } catch (e){
            console.log(e);
            return null
        }
    }

    createCart = async (cart) => {
        try{
            return await CartModel.create(cart)
        } catch (e){
            console.log(e);
            return null
        }
    }

    updateCart = async (id, cart) => {
        try{
            return await CartModel.updateOne({_id: id}, {$set: cart}, {new: true})
        } catch (e){
            console.log(e);
            return null
        }
    }


}