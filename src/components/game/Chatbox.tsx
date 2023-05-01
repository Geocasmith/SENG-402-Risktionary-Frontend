import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import GameWordAccessor from "./../helper/GameWordAccessor";
import { useSelector } from "react-redux";
import { selectVoteKey } from "./../../store";
import { updateUserScore } from "./../helper/ScoreHelper";
import { getSocketConnectionConfig } from "./../../config";
import Timer from "./TopBar/Timer";

interface Message {
  username: string | null;
  message: string;
  isCorrectGuess?: boolean;
}

const ChatBox: React.FC = () => {
  const displayName = localStorage.getItem("displayName") || "User";
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("General");
  const [hasGuessedWord, setHasGuessedWord] = useState<boolean>(false);
  const [roundFinished, setRoundFinished] = useState<boolean>(false);
  const voteKey = useSelector(selectVoteKey);
  const [time, setTime] = useState(60);
  const [remainingTime, setRemainingTime] = useState(60);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { url, options } = getSocketConnectionConfig();
    const newSocket = io(`${url}/chat`, options);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, [socket, room]);

  const handleRoundFinish = () => {
    setRoundFinished(true);
  };

  const handleTimeChange = (newTime: number) => {
    setTime(newTime);
  };

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

      const points = 50 + remainingTime;
      updateUserScore(points);

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
      username: displayName,
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
    <div
      className="flex flex-col h-screen 520" // Add the h-screen class here
      style={{
        maxHeight: "calc(100vh - 11.7em)", // Add this line to limit the max height
      }}
    >
      <div
        ref={chatAreaRef}
        className="overflow-y-auto p-4 flex-grow"
        style={{
          maxHeight: "calc(100% - 64px)", // Change this line to adjust the height of the chat area
          overflowY: "scroll", // Enable scrolling on overflow
        }}
      >
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
          disabled={hasGuessedWord || roundFinished}
        />
        <button
          onClick={sendMessage}
          className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ${
            hasGuessedWord || roundFinished
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={hasGuessedWord || roundFinished}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default ChatBox;
