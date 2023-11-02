import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
  //console.log(">>> check pass: ", hashPassword);
};
const createNewUser = async (email, username, password) => {
  let hashPass = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, username, hashPass]
    );
  } catch (err) {
    console.log(">>>> check error: ", err);
  }
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  let user = [];

  try {
    const [rows, fields] = await connection.execute("select * from users");
    return rows;
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};
const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  
  try {
    const [rows, fields] = await connection.execute("DELETE from users where id=?",[id]);
    return rows;
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};
module.exports = {
  hashUserPassword,
  createNewUser,
  getUserList,
  deleteUser,
};
