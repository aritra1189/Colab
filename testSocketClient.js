const io = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
  socket.emit("joinRoom", "testRoom");
  socket.emit("codeChange", { roomId: "testRoom", code: "console.log('He');" });
});

socket.on("codeUpdate", (code) => {
  console.log("🔄 Code Updated:", code);
});
