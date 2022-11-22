import express from "express";

const app = express();

// 뷰엔진 설정
app.set("view engine", "pug");
app.set("views", __dirname+"/views");

// static 설정
app.use("/public", express.static(__dirname+"/public"));

// 라우터 설정
app.get("/", (req, res) => res.render("home"));
app.get("*", (req, res) => res.redirect("/"));


const handleListen = () => console.log("Listening on http://localhost:3000");
app.listen(3000, handleListen);