import { ProductModel } from "../models/product.model.js"

export default class Product {
    
    getProducts = async () => {
        try{
            return await ProductModel.find().populate('categories.category')
        } catch (e){
            console.log(e);
            return null
        }
    }

    getProductById = async (id) => {
        try{
            return await ProductModel.findOne({_id: id},{'categories._id':0}).populate('categories.category')
        } catch (e){
            console.log("p find by id error:", e);
            return null
        }
    }

    getProductByCode = async (code) => {
        try{
            return await ProductModel.findOne({code: code}).populate('categories.category')
        } catch (e){
            console.log(e);
            return null
        }
    }

    getProductList = async (pids) => {
        try{
            return await ProductModel.find({'_id':{$in: pids}})
        }catch(e){
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

            console.log("llegue?",product);
            
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