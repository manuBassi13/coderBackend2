import { Router } from "express"
import { isAuth, isLog } from "../middlewares/protectedRoutes.js"

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
    return res.redirect('/current')
})

app.get('/current', (req, res) => {
    if(req.signedCookies.currentUser){
        return res.render('current')
    }
    return res.redirect('/login')
})

app.get('/profile', isAuth, (req, res) => {
    const user = req.session.user
    const isLog = req.session.isLog
    
    res.render('profile', {user, isLog})
})

app.get('/recoverPw', (req, res) => {
    res.render('recoverPw')
})



export default app