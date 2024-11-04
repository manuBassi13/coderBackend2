import User from "../dao/classes/user.dao.js"
import { createHash, generadorToken, isValidPassword, destroyToken,  getJWTCookie} from "../utils.js";

const UserService = new User()

export const login = async (req, res) => {

    try{
        const { password, email } = req.body

        const userFound = await UserService.getUserByEmail(email)

        if(!userFound) return res.status(500).json({message: '1Error en el login. User o Pass incorrectos'})
                
        if(isValidPassword(userFound, password)){
            const token = generadorToken({ email: userFound.email, first_name: userFound.first_name, role: userFound.role })
            return res.status(200).cookie('currentUser', token, {maxAge: 60000, signed: true, httpOnly: true}).json({message: 'Login Ok. ', token})
        }
        return res.status(401).json({message: '2Error en el login. User o Pass incorrectos'})
    } catch(e) {
        return res.status(400).json({ message:'Catch: '+ e })
    }
}

export const logout = async (req, res) => {
    try{
        //const token = getJWTCookie()
        console.log(token);
        return res.status(200).json({message: token})
        
    }catch(e){
        return res.status(500).json({message: e.toString()})
        
    }
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