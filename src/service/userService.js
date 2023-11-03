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
      "INSERT INTO user (email, username, password) VALUES (?, ?, ?)",
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
    const [rows, fields] = await connection.execute("select * from user");
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
    const [rows, fields] = await connection.execute(
      "DELETE from user where id=?",
      [id]
    );
    return rows;
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};
const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "select * from user where id=?",
      [id]
    );
    return rows;
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};
const updateUserInfo = async (id, email, username) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "UPDATE user set email = ?,username = ? WHERE id = ?",
      [email, username, id]
    );
  } catch (err) {
    console.log(">>>> check error: ", err);
  }
};
module.exports = {
  hashUserPassword,
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
