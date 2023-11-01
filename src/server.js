import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
require("dotenv").config();
const app = express();
//config view engine
configViewEngine(app);
// config body-pare - convert data thanh json de dang xu li
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//init web routes
initWebRoutes(app);

/** ham khai bao port
*const PORT = 8080;
*/
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(">>> JWT backend is running port - "+PORT)
})