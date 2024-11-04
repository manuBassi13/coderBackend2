import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts'

const cartSchema = new Schema({
    code: Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    status: String,
    purchase_datetime: Date,
    products: {
        default: [],
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]
    },
    amount: Number
})

export const CartModel = mongoose.model(cartCollection, cartSchema)