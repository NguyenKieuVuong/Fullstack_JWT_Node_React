import express from "express";
/**
 * @param {*} app - express app
 * 
 * cong nghe su dung viet html la view engine ejs
 * tat ca file views duoc luu trong thu muc src/views
 */
const configViewEngine =(app)=>{
    app.use(express.static('./src/public'));
    app.set("view engine","ejs");
    app.set("views","./src/views");
}
export default configViewEngine;