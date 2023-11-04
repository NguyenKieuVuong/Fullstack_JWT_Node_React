import userService from "../service/userService";

const handleHelloWord = (req, res) => {
  return res.render("home.ejs");
};
const handleUserPage = async (req, res) => {
  //model => get data from database
  let userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};
const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  userService.createNewUser(email, username, password);
  //console.log(">>>> check data", req.body);
  return res.redirect("/user");
};
const handleDeleteUser = async (req, res) => {
  //console.log(">>>> check id: ", req.params.id);
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};
const getUpdateUser = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  //check data luon co
  let userData = {};
  userData = user;
  // if (user && user.length > 0) {
  //   //vi user data la [] nen phai lay gia tri dau tien user[0]
  //   userData = user[0];
  // }
  return res.render("updateUser.ejs", { userData });
};
const handleUpdateUser = async (req, res) => {
  console.log(">>>> check id: ", req.body);
  let id = req.body.id;
  let email = req.body.email;
  let username = req.body.username;
  let user = await userService.updateUserInfo(id, email, username);

  return res.redirect("/user");
};

module.exports = {
  handleHelloWord,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
  getUpdateUser,
};
