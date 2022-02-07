const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    password: "Devil@1435",
    host : 'localhost',
    database: 'api',
    port: 5432,
})

module.exports = pool