import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt'
});
const handleHelloWord = (req,res)=>{
    return res.render("home.ejs")
}
const handleUserPage = (req,res)=>{
    //model => get data from database
    return res.render("user.ejs")
}
const handleCreateNewUser=(req,res)=>{
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
// simple query
connection.query(
    'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',[email,username,password],
    function(err, results, fields) {
        //check error
        if(err){
            console.log(err);
        }
      //console.log(results); 
      // results contains rows returned by server
      //console.log(fields); 
      // fields contains extra meta data about results, if available
    }
  );
    console.log(">>>> check data",req.body)
    return res.send('handleCreateNewUser')
}
module.exports={
    handleHelloWord,handleUserPage,handleCreateNewUser
}