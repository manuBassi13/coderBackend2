import { UserModel } from "../models/user.model.js";
import { createHash, generadorToken, isValidPassword } from "../utils.js";

export const login = async (req, res) => {

    try{
        const { password, email } = req.body
        const userFound = await UserModel.findOne({ email }).lean() 

        if(isValidPassword(userFound, password)){
            const token = generadorToken({ email: userFound.email, first_name: userFound.first_name, role: userFound.role })
            return res.status(200).cookie('currentUser', token, {maxAge: 60000, signed: true, httpOnly: true}).json({message: 'Login Ok. ', token})
        }
        return res.status(401).json({message: 'Error en el login. User o Pass incorrectos'})
    } catch(e) {
        return res.status(400).json({ message:'Error catch: ', e })
    }
}

export const register = async (req, res) => {
    try{
        const { first_name, last_name, email, age, rol, password } = req.body
        const newUser = {
            first_name,
            last_name,
            email,
            rol,
            age,
            password: createHash(password)
        }

        const user = await UserModel.create(newUser)
        return res.status(201).json({message: `Usuario creado -> ${user.nombre}`, })

    }catch(e){
        return res.status(500).json({message: "Error al crear usuario. ", e})
    }
}