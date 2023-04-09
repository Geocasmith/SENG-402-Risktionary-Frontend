import React, { useRef, useEffect, useState, MouseEvent } from "react";
import { io, Socket } from "socket.io-client";
import WordInformation from "./TopBar/WordInformation";
import Timer from "./TopBar/Timer";

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [timeUp, setTimeUp] = useState(false);

  const isDrawing = localStorage.getItem("isDrawing") === "true";
  const word = "Bus Factor"; // Replace this with the actual word from the game state

  const handleTimeUp = () => {
    setTimeUp(true);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:3001"); // Replace with your server URL
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
      setDrawing(true);
      context.beginPath();
      context.moveTo(event.clientX, event.clientY);

      if (socket) {
        socket.emit("draw", {
          x: event.clientX,
          y: event.clientY,
          color,
          drawing: true,
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!drawing) return;
      context.strokeStyle = color;
      context.lineTo(event.clientX, event.clientY);
      context.stroke();

      if (socket) {
        socket.emit("draw", {
          x: event.clientX,
          y: event.clientY,
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
  }, [drawing, color, socket]);

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

  return (
    <div>
      <div className="word-information">
        <WordInformation isDrawing={isDrawing} word={word} />
        {!timeUp && (
          <Timer
            onFinish={() => {
              handleTimeUp();
            }}
          />
        )}
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ marginRight: "10px" }}
      />
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
