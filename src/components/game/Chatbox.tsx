import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import GameWordAccessor from "./../helper/GameWordAccessor";
import { useSelector } from "react-redux";
import { selectVoteKey } from "./../../store";

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
  const [hasGuessedWord, setHasGuessedWord] = useState<boolean>(false);
  const voteKey = useSelector(selectVoteKey);

  useEffect(() => {
    const newSocket = io("http://localhost:3001/chat");
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

    const currentWord = GameWordAccessor.getGameWordNameByKey(voteKey) ?? "";

    if (message.trim().toLowerCase() === currentWord.toLowerCase()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: null,
          message: "You've guessed correctly",
          isCorrectGuess: true,
        },
      ]);
      setMessage("");
      setHasGuessedWord(true);

      fetch("/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //TODO: add in user data
        body: JSON.stringify("put user data in here"),
        
      });

      return;
    }

    const chatMessage: Message = {
      username: "User",
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
    <div className="flex flex-col 520">
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
          disabled={hasGuessedWord}
        />
        <button
          onClick={sendMessage}
          className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ${
            hasGuessedWord ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={hasGuessedWord}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
