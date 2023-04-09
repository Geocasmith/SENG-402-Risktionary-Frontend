// // import React, { useRef, useState } from "react";
// // import { Component} from 'react';
// // import CanvasDraw from "react-canvas-draw";

// function Whiteboard() {
// //     const canvasRef = useRef(null);
// //     const ctxRef = useRef(null);
// //     const [isPainting, setIsPainting] = useState(false);
// //     const [lineWidth, setLineWidth] = useState(5);
// //     const [lineColor, setLineColor] = useState("black");

// //     return (

// //       // <CanvasDraw onChange={() => console.log(this.saveableCanvas.getSaveData())} />
// //     );
//   }

//   export default Whiteboard;

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

interface Props {}

const Whiteboard: React.FC<Props> = () => {
  const socket = io();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [current, setCurrent] = useState({ color: "black" });
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousedown", onMouseDown, false);
      canvas.addEventListener("mouseup", onMouseUp, false);
      canvas.addEventListener("mouseout", onMouseUp, false);
      canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

      // Touch support for mobile devices
      canvas.addEventListener("touchstart", onMouseDown, false);
      canvas.addEventListener("touchend", onMouseUp, false);
      canvas.addEventListener("touchcancel", onMouseUp, false);
      canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);
    }
    socket.on("drawing", onDrawingEvent);
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("mouseout", onMouseUp);
        canvas.removeEventListener("mousemove", onMouseMove);

        canvas.removeEventListener("touchstart", onMouseDown);
        canvas.removeEventListener("touchend", onMouseUp);
        canvas.removeEventListener("touchcancel", onMouseUp);
        canvas.removeEventListener("touchmove", onMouseMove);
      }
      socket.off("drawing", onDrawingEvent);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const getContext = (): CanvasRenderingContext2D | null => {
    return canvasRef.current?.getContext("2d") || null;
  };

  const drawLine = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string,
    emit?: boolean
  ) => {
    const context = getContext();
    if (!context) return;

    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) {
      return;
    }
    const w = canvasRef.current?.width;
    const h = canvasRef.current?.height;

    if (w && h) {
      socket.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
      });
    }
  };

  const onMouseDown = (e: MouseEvent | TouchEvent) => {
    const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;

    setDrawing(true);
    setCurrent((prev) => ({ ...prev, x: clientX, y: clientY }));
  };

  const onMouseUp = (e: MouseEvent | TouchEvent) => {
    if (!drawing) {
      return;
    }
    setDrawing(false);
    const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;
    // @ts-ignore
    drawLine(current.x, current.y, clientX, clientY, current.color, true);
  };

  const onMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!drawing) {
      return;
    }
    const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;
    // @ts-ignore

    drawLine(current.x, current.y, clientX, clientY, current.color, true);
    setCurrent((prev) => ({ ...prev, x: clientX, y: clientY }));
  };

  const onColorUpdate = (color: string) => {
    setCurrent((prev) => ({ ...prev, color }));
  };

  const throttle = (callback: Function, delay: number) => {
    let previousCall = new Date().getTime();
    return function (this: any, ...args: any[]) {
      const time = new Date().getTime();

      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(this, args);
      }
    };
  };

  const onDrawingEvent = (data: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    color: string;
  }) => {
    const w = canvasRef.current?.width;
    const h = canvasRef.current?.height;

    if (w && h) {
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }
  };

  const onResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} className="whiteboard" />
      {colors.map((color, i) => (
        <div
          key={i}
          className={`color ${color}`}
          onClick={() => onColorUpdate(color)}
        />
      ))}
    </div>
  );
};

export default Whiteboard;
