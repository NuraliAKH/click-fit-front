import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

interface UseSocketProps {
  uri: string;
  path: string;
}

const useSocket = ({ uri, path }: UseSocketProps) => {
  const [socket, setSocket] = useState<Socket>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const newSocket = io(uri, { path, transports: ["websocket"] });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [path, uri, setSocket]);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("Connected to WebSocket server");
    };

    const handleMessage = (message: any) => {
      console.log("Message from server:", message);
    };

    const handleQueryKey = (queryKey: any[]) => {
      console.log("QueryKey from server:", queryKey);
    };

    socket.on("connect", handleConnect);
    socket.on("message", handleMessage);
    socket.on("queryKey", handleQueryKey);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("message", handleMessage);
      socket.off("queryKey", handleQueryKey);
    };
  }, [socket, queryClient]);
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useSocket({
    uri: "https://omr.jetcorp.uz/",
    path: "/api/events",
  });
  return children;
};

export default useSocket;
