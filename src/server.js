import express from "express";
import http from "http";
import WebSocket from "ws";

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


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


// 접속
wss.on("connection", (socket) => {
  console.log("Connected to Browser");
  socket.on("close", ()=> console.log("Disconnected from Browser"));
  socket.on("message", (message)=> {
    console.log(`${message}`);
  })

  socket.send("hello!");
});

server.listen(3000, handleListen);