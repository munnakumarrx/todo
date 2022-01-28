const pool = require('../database/connection')
// const app = require('../app')


const login = (req, res)=>{
    const {email, password} = req.body
    pool.query(
        'SELECT id FROM users WHERE email=$1 AND password=$2',
        [email, password],
        (error, results)=>{
            if(error){
                throw error
            } else if(results.rows.length === 0){
                res.status(404).json({
                    "message": "invalid credentials"
                })
            } else{
                // console.log(results.rows, results.rows[0].id)
                req.session.user = results.rows[0].id
                res.status(200).json({
                    "message": "You are logged in!"
                })
                }
            }
    )
}

const logout = (req, res)=>{
    console.log(req.session)
    const {user} = req.session
    if(user){
        req.session.destroy()
        res.status(200).json({
            "message": "You are successfully logged out!"
        })
    } else{
        res.status(200).json({
            "message": "You are already logged out!"
        })
    }
}

module.exports = {
    login,
    logout
}