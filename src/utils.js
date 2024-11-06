import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createHash = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10))

export const isValidPassword = (user, pass) => bcrypt.compareSync(pass, user.password)

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const generadorToken = (user) =>{
    const token = jwt.sign(user, process.env.SECRET , { expiresIn: '24h' })
    return token
}

export const destroyToken = (token) => {
    const result = jwt.destroy(token)
    console.log();
    
    return result
}

export const getJWTCookie = (req) => {
    let token = null
    if(req.signedCookies){
        token = req.signedCookies['currentUser']
    }
    return token
}

// export const decodeToken = (req, res, next) => {
//     const token = req.headers.authorization
//     console.log(token);
    
//     if(!token) res.status(400).json({message: "Error token"})
//         jwt.verify(token, process.env.SECRET, (err, userDecoded) =>{
//             if(err) res.status(400).json({message: "error"})
//             console.log(userDecoded);
    
//             req.user = userDecoded.user
//             next()
//         })
// }
