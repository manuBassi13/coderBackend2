import Product from "../dao/classes/product.dao.js";

const ProductService = new Product()

export const getProducts = async (req, res) => {
    const result = await ProductService.getProducts()
    if(!result) return res.status(500).json({status:'Error al buscar todos los productos'})
    
        res.status(200).json({message: 'Ok', payload: result})
}

export const getProductById = async (req, res) => {
    const { pid } = req.params
    const prodFound = await ProductService.getProductById(pid)
    if(!prodFound) return res.status(500).json({message: 'Producto no encontrado'})

    res.status(200).json({message:'Producto encontrado', payload: prodFound})
}

export const getProductByCode = async (req, res) => {
    const { code } = req.params
    const prodFound = await ProductService.getProductByCode(code)
    if(!prodFound) return res.status(500).json({message: 'Producto no encontrado'})

    res.status(200).json({message:'Producto encontrado', payload: prodFound})
}

export const createProduct = async (req, res) => {
    const prod = req.body
    const newProd = {
        title: prod.title,
        code: prod.code,
        price: prod.price,
        status: prod.status,
        stock: prod.stock,
        categories: prod.categories,
        thumbnail: prod.thumbnail
    }
    const prodResult = await ProductService.createProduct(newProd)
    if(!prodResult) return res.status(500).json({message: "Error al crear producto. ", e})
    
    res.status(201).json({ message: 'Producto creado', payload: prodResult })
    
}

export const updateProduct = async (req, res) => {
    const prod = req.body
    const { pid } = req.params
    const prodFound = await ProductService.getProductById(pid)
    console.log("prodFound: ",prodFound);
    console.log("prod: ",prod);
    if(!prodFound) return res.status(500).json({message: 'Producto no encontrado'})

    const prodUpdated = {
        title: prodFound.title,
        code: prodFound.code,
        price: prodFound.price,
        status: prodFound.status,
        stock: prodFound.stock,
        categories: prodFound.categories,
        thumbnail: prodFound.thumbnail,
        ...prod
    }
    console.log("prodUpdated: ", prodUpdated);
        await ProductService.updateProduct(prodFound._id, prodUpdated)
    res.status(200).json({message: "Producto actualizado.", payload: prodUpdated})
    
}

export const deleteProduct = async (req, res) => {
    const { pid } = req.params
    const prodFound = await ProductService.getProductById(pid)
    if(!prodFound) return res.status(500).json({message: 'Producto no encontrado'})

    await ProductService.deleteProduct(pid)
    res.status(200).json({message: "Producto eliminado."})
}
