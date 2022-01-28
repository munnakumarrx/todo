const pool = require('../database/connection')


const getTodo = (req, res)=>{
    pool.query(
        'SELECT id,title,description FROM todo WHERE user_id=$1',
        [req.session.user],
        (error, results)=>{
            if(error){
                res.status(404).json({
                    error
                })
            } else{
                res.status(200).json(results.rows)
            }
        }
    )
}

const postTodo = (req, res)=>{
    const {title, description, due_date} = req.body
    const Dates = new Date()
    const date = Dates.getDate()
    const month = Dates.getMonth() + 1
    const year = Dates.getFullYear()
    const fullDate = `${year}-${month}-${date}`
    pool.query(
        'INSERT INTO todo(user_id,title,description,created_at,due_date) VALUES($1,$2,$3,$4,$5)',
        [req.session.user, title, description, fullDate, due_date],
        (error, results) =>{
            if(error){
                res.status(404).json({
                    error
                })
            } else{
                res.status(200).json({
                    "message": "data inserted"
                })
            }
        }
    )
}

const updateTodo = (req, res)=>{
    const {title, description} = req.body
    const id = parseInt(req.params.id)
    pool.query(
        'UPDATE todo SET title=$1, description=$2 WHERE id=$3',
        [title, description, id],
        (error, results)=>{
            if(error){
                res.status(404).json(error)
            }
            else{
                res.status(200).json({
                    "message": "updated"
                })
            }
        }
    )
}

const deleteTodo = (req, res)=>{
    const id = parseInt(req.params.id)
    pool.query(
        'DELETE FROM todo WHERE id=$1',
        [id],
        (error, results)=>{
            if(error){
                res.status(404).json(error)
            }
            else{
                res.status(200).json({
                    "message": "deleted"
                })
            }
        }
    )
}

const filterByDate = (req, res)=>{
    const {search} = req.query
    const id = parseInt(req.params.id)
    const Dates = new Date()
    const date = Dates.getDate()
    const month = Dates.getMonth() + 1
    const year = Dates.getFullYear()
    const fullDate = `${year}-${month}-${date}`
    if(search === 'c') {
        pool.query(
            'SELECT id,title,description FROM todo WHERE user_id=$1 and created_at=$2',
            [req.session.user, fullDate],
            (error, results) => {
                if (error) {
                    res.status(404).json(error)
                } else {
                    res.status(200).json(results.rows)
                }
            }
        )
    }else if(search === 'e') {
        pool.query(
            'SELECT id,title,description FROM todo WHERE user_id=$1 and due_date<$2',
            [req.session.user, fullDate],
            (error, results) => {
                if (error) {
                    res.status(404).json(error)
                } else {
                    res.status(200).json(results.rows)
                }
            }
        )
    }else if(search === 'u') {
        pool.query(
            'SELECT id,title,description FROM todo WHERE user_id=$1 and due_date>$2',
            [req.session.user, fullDate],
            (error, results) => {
                if (error) {
                    res.status(404).json(error)
                } else {
                    console.log(results.rows)
                    res.status(200).json(results.rows)
                }
            }
        )
    }
}

module.exports = {
    getTodo,
    postTodo,
    updateTodo,
    deleteTodo,
    filterByDate,
}