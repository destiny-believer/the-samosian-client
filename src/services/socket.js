import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL || "";
const socketBaseURL =
  import.meta.env.VITE_SOCKET_URL ||
  apiUrl.replace(/\/api$/, "") ||
  window.location.origin;

const socket = io(
  socketBaseURL,
  {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ["websocket", "polling"]
  }
);

// Connection event handlers
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error);
});

export default socket;