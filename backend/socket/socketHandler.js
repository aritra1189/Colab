export const setupSocket = (io) => {
    console.log("✅ Socket.IO initialized"); // Add this to confirm setup
  
    io.on("connection", (socket) => {
      console.log("🟢 User connected:", socket.id);
  
      socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`🚀 User ${socket.id} joined room ${roomId}`);
        socket.to(roomId).emit("userJoined", "A new user has joined the room!");
      });
  
      socket.on("codeChange", ({ roomId, code }) => {
        console.log(`✏️ Code updated in room ${roomId}:`, code); // Debugging
        socket.to(roomId).emit("codeUpdate", code);
      });
      socket.on("languageChange", ({ roomId, language }) => {
        console.log("🛠 Language changed to:", language);
        socket.to(roomId).emit("languageUpdate", language);
      });
      socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
      });
    });
  };
  
  