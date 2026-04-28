import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (user) {
            const newSocket = io("http://localhost:4000", {
                query: { userId: user._id },
                transports: ["websocket"]
            });

            setSocket(newSocket);

            newSocket.on("new_notification", (data) => {
                setUnreadCount((prev) => prev + 1);
            });

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, unreadCount, setUnreadCount }}>
            {children}
        </SocketContext.Provider>
    )
}