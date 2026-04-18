import { Server } from "socket.io";

let io;

const userSocketMap = {};

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("A user connected!", socket.id);

        socket.on("register_user", (userId) => {
            userSocketMap[userId] = socket.id;
            console.log(`User ${userId} registered to socket ${socket.id}`);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);

            for (let userId in userSocketMap) {
                if (userSocketMap[userId] === socket.id) {
                    delete userSocketMap[userId];
                    break;
                }
            }
        });
    });

    return io;
};


export const emitNotification = (recipientId, notificationData) => {
    const socketId = userSocketMap[recipientId];
    if (socketId && io) {
        io.to(socketId).emit("new Notification", notificationData);
    }
}