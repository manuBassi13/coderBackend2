import mongoose , { Schema } from "mongoose"

const categoriesCollection = 'categories'

const categorySchema = new Schema({
    description: {
        type: String,
        require: true
    }
})


export const CategoryModel = mongoose.model(categoriesCollection, categorySchema)