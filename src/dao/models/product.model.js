import mongoose, { Schema } from 'mongoose'

const productCollection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    code: {
        type: String,
        unique: true,
        require: true
    },
    price: Number,
    status: Boolean,
    stock: Number,
    categories: {
        default: [],
        type: [{
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "categories"
            }
        }]
    },
    thumbnail: String
})



export const ProductModel = mongoose.model(productCollection, productSchema)