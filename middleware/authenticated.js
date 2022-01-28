const isAuthenticated =(req, res, next)=>{
    const {user} = req.session
    if(!user) {
        return res.status(400).json({
            "message": "login Required!"
        })
    }
    next()
}

module.exports = isAuthenticated