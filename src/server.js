import express from "express";
import SocketIO from "socket.io";
import http from "http";

const app = express();


// 뷰엔진 설정
app.set("view engine", "pug");
app.set("views", __dirname+"/views");

// static 설정
app.use("/public", express.static(__dirname+"/public"));

// 라우터 설정
app.get("/", (req, res) => res.render("home"));
app.get("*", (req, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  
  socket.on("enter_room", (roomName, done) => {
    done();
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });

  socket.on("disconnecting", () => {
    console.log("bye");
    socket.rooms.forEach(room => socket.to(room).emit("bye"));
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
  });

});


const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);