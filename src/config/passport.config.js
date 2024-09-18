import passport from 'passport'
import local from 'passport-local'
import {Strategy as githubStrategy} from 'passport-github2'
import { UserModel } from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'

const localStrategy = local.Strategy

const initPassport = () => {


    passport.use('register', new localStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try{
            const { first_name, last_name, email, age, role } = req.body

            const userFound = await UserModel.findOne({email: username})
            if(userFound){
                console.log("Usuario ya registrado");
                done(null, false)
            }
            
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart:[],
                role
            }
            const user = await UserModel.create(newUser)
            return done(null, user)
        }catch (e){
            return done("Error en la BBDD. "+e)
        }
    }))

    passport.use('login', new localStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try{
            const userFound = await UserModel.findOne({email: username})

            if(!userFound) return done(null, false)

            if(!isValidPassword(userFound, password)) return done(null, false)

            return done(null, userFound)

        }catch (e){
            return done("Error en la BBDD. "+e)
        }
    }))

    passport.use(new githubStrategy({
            clientID: 'Iv23ct0XhsrZW4Phk77X',
            clientSecret: 'ad7a207625ab52e06b7dce6c448d8833603ef0bc',
            callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
        }, async (accToken, refreshToken, profile, done) => {
        console.log(profile);
        try{
            const user = await UserModel.findOne({email: profile?._json?.email ?? profile.username})
            console.log(profile);
            if(!user){          
                const newUser = {
                    first_name: ' ',
                    last_name: ' ',
                    email: profile?._json?.email ?? profile.username,
                    password: ' ',
                    age: 20,
                    cart: [],
                    role: 'user'
                }
                const userCreated = await UserModel.create(newUser)
                return done(null, userCreated)
            }else{
                return done(null, user)
            }
        } catch(e){
            return done("Error al loguearse via GitHub. "+e)
        }
    }))

    passport.serializeUser((user, done)=> {
        done(null, user._id)
    })

    passport.deserializeUser( async (id, done)=> {
        try{
            const user = await UserModel.findById(id)
            return done(null, user)
        }catch(e){
            return done("Error des: "+e)
        }
    })

}


export default initPassport