import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import session from "express-session";
import { createHash, isValidPassword, decodeToken, generadorToken } from "../utils.js";
import passport from "passport";

const app = Router()


app.get('/getSession', (req, res) => {
    try{
        res.json({ session: req.session})
    }catch(e){
        console.log("Error", e);
    }  
})


app.post('/register', passport.authenticate('register', { failureRedirect: '/failRegister' }), (req, res) => {
    res.status(201).json({message: "Pasó la estrategia de registro exitosamente"})
})

app.get('/failRegister', (req, res) => {
    res.status(400).json({message: "Error al registrar usuario"})
})

app.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), (req, res) => {
    if(!req.user) return  res.status(400).json({message: "Error en las credenciales"})    
    
    req.session.user = {
        nombre: req.user.nombre,
        apellido: req.user.apellido,
        edad: req.user.edad,
        email: req.user.email    
    }
    
    req.session.isLog = true

    res.status(200).json({message: 'Usuario logueado (Paso la estrategia de login'})
})


app.get("/githubLogin", passport.authenticate('github', {scope: ['user:email']}) , async (req, res) => {
    console.log("paso path: githublogin");
    
})

app.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/failLogin', scope:['user:email'] }), (req,res) =>{
    console.log("path: githubcallback");
    
    req.session.user = req.user //Obtenemos los datos de github del usuario y lo guardamos en la sesión
    req.session.isLog = true
    res.redirect('/')
})

app.get('/failLogin', (req, res) => {
    res.status(400).json({message:"Error al loguearse"})
})  

app.get('/logout', (req, res) => {
    req.session.destroy( (err) => {
        if (err) return res.send('Error al desloguear')
        return res.redirect('/')
    })
})

app.post('/recoverPw', async (req, res) => {
    const {email, password} = req.body
    console.log({email, password});
    
    if(!email || !password) return res.status(404).json({message: "Valores no ingresados"})
    try {
        const userFound = await UserModel.findOne({email}).lean()
        console.log("User found: ", userFound);
        
        if(!userFound) return res.status(404).json({message: 'Usuario no encontrado'})
        userFound.password = createHash(password)
        console.log("newPass", userFound.password);
        
        await UserModel.updateOne({_id: userFound._id}, userFound).lean()
        //console.log(userUpdated);
        
        res.status(200).json({message: 'Contraseña actualizada. '})
        
    } catch (e) {
        res.status(400).json({message: 'Error al actualizar la contraseña'})
    }
})

app.post('/login2', (req, res) => {
    //Validamos en nuestra DB si el usuario existe

    const token = generadorToken({nombre: 'Juan', apellido: 'Perez'})
    res.json({message: "Token generado: ", token})
})

app.get('/users', decodeToken, (req, res) => {
    res.json({usuario: req?.user})
})

export default app