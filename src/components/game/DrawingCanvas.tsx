import React, { useRef, useEffect, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { selectVoteKey } from "./../../store";
import { io, Socket } from "socket.io-client";
import WordInformation from "./TopBar/WordInformation";
import Timer from "./TopBar/Timer";
import GameWordAccessor from "./../helper/GameWordAccessor";
import "./../../App.css";

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [timeUp, setTimeUp] = useState(false);
  const [time, setTime] = useState(60);

  // Check both isDrawing and isTeacher conditions
  const isDrawing =
    localStorage.getItem("isDrawing") === "true" &&
    localStorage.getItem("isTeacher") === "true";
  const voteKey = useSelector(selectVoteKey);
  const word = GameWordAccessor.getGameWordNameByKey(voteKey) ?? "";
  const handleTimeUp = () => {
    setTimeUp(true);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleDrawEvent = (event: {
      x: number;
      y: number;
      color: string;
      drawing: boolean;
    }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      if (event.drawing) {
        context.beginPath();
        context.moveTo(event.x, event.y);
      } else {
        context.strokeStyle = event.color;
        context.lineTo(event.x, event.y);
        context.stroke();
      }
    };

    const handleClearEvent = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    socket.on("draw", handleDrawEvent);
    socket.on("clear", handleClearEvent);

    return () => {
      socket.off("draw", handleDrawEvent);
      socket.off("clear", handleClearEvent);
    };
  }, [socket]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setDrawing(true);
      context.beginPath();
      context.moveTo(x, y);

      if (socket) {
        socket.emit("draw", {
          x,
          y,
          color,
          drawing: true,
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!drawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      context.strokeStyle = color;
      context.lineTo(x, y);
      context.stroke();

      if (socket) {
        socket.emit("draw", {
          x,
          y,
          color,
          drawing: false,
        });
      }
    };

    const handleMouseUp = () => {
      setDrawing(false);
    };

    //@ts-ignore
    canvas.addEventListener("mousedown", handleMouseDown);
    //@ts-ignore
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      //@ts-ignore
      canvas.removeEventListener("mousedown", handleMouseDown);
      //@ts-ignore
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [drawing, color, socket, isDrawing]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (socket) {
      socket.emit("clear");
    }
  };

  const colors = ["#000000", "#FF0000", "#FFFF00", "#00FF00", "#0000FF"];

  return (
    <div>
      <div className="word-information">
        <WordInformation isDrawing={isDrawing} word={word} time={time} />
        {!timeUp && (
          <Timer
            onFinish={() => {
              handleTimeUp();
            }}
            onTimeChange={(newTime) => setTime(newTime)} // Add this line to update the time state
          />
        )}
      </div>
      <div className="color-picker">
        {colors.map((c) => (
          <div
            key={c}
            className="color-box"
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
        <div
          className="color-box"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid black" }}
          onClick={() => setColor("#FFFFFF")}
        />
      </div>
      <button onClick={clearCanvas}>Clear</button>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black", display: "block" }}
        width="800"
        height="600"
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
