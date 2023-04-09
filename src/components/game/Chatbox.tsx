import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  username: string | null;
  message: string;
  isCorrectGuess?: boolean;
}

const ChatBox: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("General");

  useEffect(() => {
    const newSocket = io("http://localhost:3001/chat"); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, [socket, room]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    if (message.trim().toLowerCase() === "test") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: null,
          message: "You've guessed correctly",
          isCorrectGuess: true,
        },
      ]);
      setMessage("");
      return;
    }

    const chatMessage: Message = {
      username: "User", // Replace with the actual username
      message: message.trim(),
    };

    socket?.emit("sendMessage", chatMessage, room);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto p-4 flex-grow">
        {messages.map((msg, index) => (
          <p key={index} className={msg.isCorrectGuess ? "text-green-500" : ""}>
            {msg.username ? <strong>{msg.username}:</strong> : null}{" "}
            {msg.message}
          </p>
        ))}
      </div>
      <div className="flex p-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow mr-4 border-2 border-gray-300 p-2 rounded-md"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
