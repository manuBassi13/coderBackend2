import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import bcrypt from 'bcrypt'
import { faker } from "@faker-js/faker";
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

export const generateUser = () => {
    return{
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({min:18, max:99}),
        password: createHash('coder123'),
        cart: [],
        role: Math.random() < 0.5 ? 'user' : 'admin'
    }
}