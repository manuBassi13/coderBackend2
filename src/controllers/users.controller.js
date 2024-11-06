import User from "../dao/classes/user.dao.js"
import { UserSensitiveDataDTO } from "../dto/user.dto.js";
import { createHash } from "../utils.js";

const UserService = new User()

export const getUsers = async (req, res) => {
    const result = await UserService.getUsers()
    if(!result) return res.status(500).json({status:'Error al buscar todos los usuarios'})
    
    res.status(200).json({message: 'Ok', payload: result})
}

export const getUserById = async (req, res) => {
    const { uid } = req.params
    const userFound = await UserService.getUserById(uid)
    if(!userFound) return res.status(500).json({message: 'Usuario no encontrado'})

    const userData = new UserSensitiveDataDTO(userFound)
    res.status(200).json({message:'Usuario encontrado', payload: userData})
}

export const getUserByEmail = async (req, res) => {
    const { email } = req.params
    const userFound = await UserService.getUserByEmail(email)
    if(!userFound) return res.status(500).json({message: 'Usuario no encontrado'})

    res.status(200).json({message:'Usuario encontrado', payload: userFound})
}

export const createUser = async (req, res) => {
    const user = req.body
    const newUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        age: user.age,
        password: createHash(user.password)
    }
    const userResult = await UserService.createUsers(newUser)
    if(!userResult) return res.status(500).json({message: "Error al crear usuario. ", e})
    
    res.status(201).json({message: `Usuario creado -> ${userResult.first_name}`, })
}


export const updateUser = async (req, res) => {
    const user = req.body
    const {uid} = req.params
    const userFound = await UserService.getUserById(uid)
    if(!userFound) return res.status(500).json({message: 'Usuario no encontrado'})
        console.log(user);
        
    const userUpdated = {
        ...userFound,
        ...user,
        password: user.password ? createHash(user.password) : userFound.password
    }
    console.log(userUpdated);
    
    await UserService.updateUser(userFound._id, userUpdated)
    res.status(200).json({message: "Usuario actualizado.", payload: userUpdated})
}

export const recoverPw = async (req, res) => {
    const { email, password } = req.body
    
    if(!email || !password) return res.status(400).json({message: "Datos inexistentes o inválidos"})
    try{
        const userFound = await UserService.getUserByEmail(email)
        if(!userFound) return res.status(404).json({message: 'Usuario no encontrado.'})
        
        userFound.password = createHash(password)
        await UserService.updateUser(userFound._id, userFound)
        res.status(200).json({message: "Contraseña actualizada."})
    }catch (e){
        return res.status(500).json({message: "Error al generar nueva contraseña. ", e})
    }
}

