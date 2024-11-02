import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts'

const cartSchema = new Schema({
    products: {
        default: [],
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number,
                default: 0
            }
        }]
    }
})

export const CartModel = mongoose.model(cartCollection, cartSchema)