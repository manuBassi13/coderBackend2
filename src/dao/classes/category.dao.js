import { CategoryModel } from "../models/category.model.js"

export default class Category{

    getCategories = async () => {
        try{
            return await CategoryModel.find()
        }catch(e){
            console.log(e);
            return null
        }
    }

    createCategory = async (category) => {
        try{
            return await CategoryModel.create(category)
        }catch(e){
            console.log(e);
            return null
        }
    }

}