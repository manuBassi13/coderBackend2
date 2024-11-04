import Category from "../dao/classes/category.dao.js";

const CategoryService = new Category()

export const getCategories = async (req, res) => {
    const result = await CategoryService.getCategories()
    if(!result) return res.status(500).json({status:'Error al buscar todas los categorias'})
    
    res.status(200).json({message: 'Ok', payload: result})

}

export const createCategory = async (req, res) => {
    const category = req.body
    const newCategory = {
        description: category.description
    }
    const catResult = await CategoryService.createCategory(newCategory)
    if(!catResult)return res.status(500).json({message: "Error al crear categoría. ", e})
    
    res.status(201).json({ message: 'Categoría creada', payload: catResult })
}