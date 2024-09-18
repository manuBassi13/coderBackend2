
export const handleAuth = (...roles) => {
    return (req, res, next) => {
        if(!req.user) return res.status(401).json({error: 'No hay usuario'})
        if(!roles.includes(req.user.rol)) return res.status(403).json({error: 'Usuario no autorizado'})
            
        next()
    }
}