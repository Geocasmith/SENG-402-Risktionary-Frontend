import React, { useRef, useEffect, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { selectVoteKey } from "./../../store";
import { io, Socket } from "socket.io-client";
import WordInformation from "./TopBar/WordInformation";
import Timer from "./TopBar/Timer";
import GameWordAccessor from "./../helper/GameWordAccessor";
import "./../../App.css";
import { getSocketConnectionConfig } from "./../../config";
import cx from "classnames";
import CountdownTimer from "../helper/CountdownTimer";


interface DrawingCanvasProps {
  className?: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [timeUp, setTimeUp] = useState(false);
  const [time, setTime] = useState(90);
  const [strokeSize, setStrokeSize] = useState(2);


  // Check both isDrawing and isTeacher conditions
  const isDrawing =
    localStorage.getItem("isDrawing") === "true";
  const voteKey = useSelector(selectVoteKey);
  const word = GameWordAccessor.getGameWordNameByKey(voteKey) ?? "";
  const handleTimeUp = () => {
    setTimeUp(true);
  };

  useEffect(() => {
    // Replace the hardcoded URL and options with the function call
    const { url, options } = getSocketConnectionConfig();
    const newSocket = io(url, options);
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
      strokeSize: number; // Add strokeSize here
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
        context.lineWidth = event.strokeSize; 
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
  
    const handleInteractionStart = (x: number, y: number) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      setDrawing(true);
      context.beginPath();
      context.moveTo(x, y);
  
      if (socket) {
        socket.emit("draw", {
          x,
          y,
          color,
          drawing: true,
          strokeSize,
        });
      }
    };
  
    const handleInteractionMove = (x: number, y: number) => {
      if (!drawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      context.strokeStyle = color;
      context.lineWidth = strokeSize; // Add this line for stroke size support
      context.lineTo(x, y);
      context.stroke();
  
      if (socket) {
        socket.emit("draw", {
          x,
          y,
          color,
          drawing: false,
          strokeSize,
        });
      }
    };
  
    const handleMouseDown = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      handleInteractionStart(x, y);
    };
  
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      handleInteractionMove(x, y);
    };
  
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = event.touches[0].clientX - rect.left;
      const y = event.touches[0].clientY - rect.top;
      handleInteractionStart(x, y);
    };
  
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = event.touches[0].clientX - rect.left;
      const y = event.touches[0].clientY - rect.top;
      handleInteractionMove(x, y);
    };
  
    const handleMouseUp = () => {
      setDrawing(false);
    };
  
    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      setDrawing(false);
    };
    // @ts-ignore
    canvas.addEventListener("mousedown", handleMouseDown);
        // @ts-ignore
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);
  
    return () => {
          // @ts-ignore
      canvas.removeEventListener("mousedown", handleMouseDown);
          // @ts-ignore
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
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

  const colors = [
    "#000000", "#FF0000", "#FFFF00", "#00FF00", "#0000FF",
    "#FFA500", "#8A2BE2", "#5F9EA0", "#FFC0CB", "#808080",
  ];

  const skipDrawing = () => {
    if (socket) {
      socket.emit("skip");
    }
  };
  

  return (
    <div className={className}>
      <div className="word-information">
        <WordInformation isDrawing={isDrawing} word={word} time={time} />
        {/* {!timeUp && (
          <Timer
            onFinish={() => {
              handleTimeUp();
            }}
            onTimeChange={(newTime) => setTime(newTime)}
          />
        )} */}
        <CountdownTimer seconds={90} onTimeOut={() => console.log("time out")} />
      </div>
  
      {isDrawing && (
        <>
          <div className="toolbar flex items-center justify-between">
            <div className="color-picker flex items-center">
              {colors.map((c) => (
                <div
                  key={c}
                  className="color-box w-6 h-6 m-1 border border-black cursor-pointer"
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
              <div
                className="color-box w-6 h-6 m-1 border border-black cursor-pointer"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid black",
                }}
                onClick={() => setColor("#FFFFFF")}
              />
            </div>
  
            <div className="stroke-size-picker flex items-center">
              <label htmlFor="stroke-size" className="mr-2">
                Stroke size: {strokeSize}
              </label>
              <input
                type="range"
                id="stroke-size"
                name="stroke-size"
                min="1"
                max="20"
                value={strokeSize}
                onChange={(e) =>
                  setStrokeSize(parseInt(e.target.value))
                }
                className="w-32"
              />
            </div>
  
            <button
              onClick={clearCanvas}
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear
            </button>
            <button
              onClick={skipDrawing}
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Skip
            </button>
          </div>
        </>
      )}
  
      <canvas
        ref={canvasRef}
        className={cx("border border-black", "hidden md:block")}
        width="800"
        height="600"
      ></canvas>
    </div>
  );
  
};

export default DrawingCanvas;
