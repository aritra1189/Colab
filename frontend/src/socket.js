import { io } from "socket.io-client";

const socket = io("https://colab-433t.onrender.com", {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
