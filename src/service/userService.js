import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
  //console.log(">>> check pass: ", hashPassword);
};
const createNewUser = async (email, username, password) => {
  let hashPass = hashUserPassword(password);

  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (err) {
    console.log(">>>> check error: ", err);
  }
};

const getUserList = async () => {
  //test relationships
  // let newUser = await db.User.findOne({
  //   where: { id: 1 },
  //   include: { model: db.Group },
  //   raw: true,
  //   nest: true,
  // });
 
  let Roles = await db.Group.findOne({
    include: { model: db.Role },
    raw: true,
    nest: true,
  });
  console.log(">>> check data object Roles:", Roles);
  let newUser = await db.User.findOne({
    where: { id: 1 },
    /*muon lay cac truong du lieu nao thi khai bao thuoc tinh attribute */
    attributes: ["id", "username", "email"],
    include: { module: db.Group, attributes: ["name", "description"] },
    /*tra data ra object nen khai bao thuoc tinh raw*/
    raw: true,
    /*khi join table muon gom data vao 1 object e khai bao thuoc tinh nest*/
    nest: true,
  });
  console.log(">>> check data object users:", newUser);
  // let allRow = await db.Role.findAll({
  //   include: { module: db.Group, where: { id: 1 } },
  //   raw: true,
  //   nest: true,
  // });

  let user = [];
  user = await db.User.findAll();
  return user;

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute("select * from user");
  //   return rows;
  // } catch (err) {
  //   console.log(">>> check error: ", err);
  // }
};
const deleteUser = async (id) => {
  await db.User.destroy({
    where: { id: id },
  });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE from user where id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (err) {
  //   console.log(">>> check error: ", err);
  // }
};
const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return user.get({ plain: true });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "select * from user where id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (err) {
  //   console.log(">>> check error: ", err);
  // }
};
const updateUserInfo = async (id, email, username) => {
  //let user = {};
  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id,
      },
    }
  );
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user set email = ?,username = ? WHERE id = ?",
  //     [email, username, id]
  //   );
  // } catch (err) {
  //   console.log(">>>> check error: ", err);
  // }
};
module.exports = {
  hashUserPassword,
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
