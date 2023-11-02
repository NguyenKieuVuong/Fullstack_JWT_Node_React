import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();
const initWebRoutes = (app) => {
  // router.get("/", (req,res)=>{
  //     return res.send("hello word");
  // })
  // path, handler
  router.get("/", homeController.handleHelloWord);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/edit-user/:id", homeController.getUpdateUser);
  router.post("/update-user", homeController.handleUpdateUser);
  return app.use("/", router);
};
export default initWebRoutes;
