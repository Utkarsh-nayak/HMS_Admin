let pg= require('pg')
let connection = new pg.Client({
    host:'localhost',
    user:'postgres',
    password:'17141714',
    database:'hospital_management',
    port:5432,
})

connection.connect(function(error){
    if(error){console.log("Error",error)}
 else{
    console.log("connected...")
 }
})

module.exports = connection;