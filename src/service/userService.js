import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
const salt = bcrypt.genSaltSync(10);

// create the connection to database
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "jwt",
// });

const hashUserPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
  //console.log(">>> check pass: ", hashPassword);
};
const createNewUser = (email, username, password) => {
  let hashPass = hashUserPassword(password);
  // simple query
  connection.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, hashPass],
    function (err, results, fields) {
      //check error
      if (err) {
        console.log(err);
      }
      //console.log(results);
      // results contains rows returned by server
      //console.log(fields);
      // fields contains extra meta data about results, if available
    }
  );
};
// const checkPassword =(password,hashPassword)=>{
//     let checkPass = bcrypt.compareSync(password, hashPassword);
//     return checkPass;
// }
// kiem tra mat khau, password la text nguoi dung nhap,hashpass la ma hoa duoc luu csdl
//   let checkPassword = bcrypt.compareSync(password, hashPassword); // true
//   console.log(">>>check pass 2: ", checkPassword);
const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  let user = [];
  //   connection.query("select * from users", function (err, results, fields) {
  //     //check error
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log("check data user: ", results);
  //   });
  try {
    const [rows, fields] = await connection.execute("select * from users");
    return rows;
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};
module.exports = {
  hashUserPassword,
  createNewUser,
  getUserList,
};
