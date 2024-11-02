import { ProductModel } from "../models/product.model.js"


export default class Product {
    
    getProducts = async () => {
        try{
            return await ProductModel.find()
        } catch (e){
            console.log(e);
            return null
        }
    }

    getProductById = async (id) => {
        try{
            return await ProductModel.findOne({_id: id})
        } catch (e){
            console.log(e);
            return null
        }
    }

    createProduct = async (product) => {
        try{
            return await ProductModel.create(product)
        } catch (e){
            console.log(e);
            return null
        }
    }

    updateProduct = async (id, product) => {
        try{
            return await ProductModel.updateOne({_id: id}, {$set: product}, {new: true})
        } catch (e){
            console.log(e);
            return null
        }
    }

    deleteProduct = async (id) => {
        try{
            return ProductModel.deleteOne({_id: id})
        } catch (e){
            console.log(e);
            return null
        }
    }


}