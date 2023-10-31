import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
const app = express();
//config view engine
configViewEngine(app);
//init web routes
initWebRoutes(app);

/** ham khai bao port
*const PORT = 8080;
*/
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(">>> JWT backend is running port - "+PORT)
})