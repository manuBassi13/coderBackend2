import { Router } from "express"
import { isAuth, isLog } from "../middlewares/protectedRoutes.js"
import { invokePassport } from "../middlewares/handleError.js"

const app = Router()

app.get('/', (req, res) => {
    res.render('home', {
        user: req?.session?.user
    })
})

app.get('/register', (req, res) =>{
    res.render('register')
})

app.get('/login', (req, res) => {
    if(!req.signedCookies.currentUser){
        return res.render('login')
    }
    return res.redirect('/profile')
})

app.get('/current', (req, res) => {
    if(req.signedCookies.currentUser){
        return res.render('current')
    }
    return res.redirect('/login')
})

app.get('/profile', invokePassport('jwt'), (req, res) => {
    const user = req.user
    if(req.signedCookies.currentUser){
        return res.render('profile', {user})
    }
    return res.redirect('/login')
    //const user = req.signedCookies.currentUser
    //console.log(user);
    //const isLog = req.session.isLog
})

app.get('/recoverPw', (req, res) => {
    res.render('recoverPw')
})



export default app