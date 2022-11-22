
// window.location.host => 접속한 호스트 명으로 변환 기능
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server");
})

socket.addEventListener("message", (message) => {
  console.log("Just got this:", message.data, "from the server");
})

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
})


setTimeout(() => {
  socket.send("hello from browser!");
}, 5000);
