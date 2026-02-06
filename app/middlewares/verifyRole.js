const isAdmin = (req, res, next) => {
    if (!req.user){
        return res.status(403).json({message: "No user logged in"})
    }
    if (req.user.role === 'admin'){
        next()
    } else{
        return res.status(403).json({message: 'access denied: you do not have admin privileges'})
    }
}
module.exports = {isAdmin}