const auth = require('../models/auth')

const login = async (req, res)=>{
    try{
        const user = await auth.findOne(req.body)
        if (!user){
            return res.status(401).json({
                msg: "Invalid Credentials"
            })
        }
        req.session.user = user.id
        res.status(200).json({
            msg: "You are logged in!"
        })
    } catch (err){
        res.status(500).json({
            error: err.message
        })
    }

}

const logout = (req, res)=>{
    const {user} = req.session
    if(user){
        req.session.destroy()
        res.status(200).json({
            msg: "You are successfully logged out!"
        })
    } else{
        res.status(200).json({
            error: "You are already logged out!"
        })
    }
}

const register = async (req, res)=>{
    try{
        await auth.create(req.body)
        res.status(201).json({
            msg: `User created`
        })
    }catch (err){
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    login,
    logout,
    register
}