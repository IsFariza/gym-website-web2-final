const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token){
        return res.status(403).json({message: 'No token'})
    } 
    try{
        const decoded = jwt.verify(token, config.secret)
        req.user = decoded
        next()
    } catch(error){
        return res.status(401).json({message: 'Unathorized: invalid token'})
    }
}