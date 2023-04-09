import React, { useEffect, useRef, useState } from "react";

interface DrawingAppState {
  isPainting: boolean;
  lineWidth: number;
  strokeStyle: string;
}

const DrawingApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [state, setState] = useState<DrawingAppState>({
    isPainting: false,
    lineWidth: 5,
    strokeStyle: "#000000",
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const canvasOffsetX = canvas.offsetLeft;
        const canvasOffsetY = canvas.offsetTop;

        canvas.width = window.innerWidth - canvasOffsetX;
        canvas.height = window.innerHeight - canvasOffsetY;

        const draw = (e: MouseEvent) => {
          if (!state.isPainting) {
            return;
          }

          ctx.lineWidth = state.lineWidth;
          ctx.lineCap = "round";
          ctx.strokeStyle = state.strokeStyle;

          ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
          ctx.stroke();
          ctx.beginPath(); // Move this line to the end of handleMouseDown
          ctx.moveTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY); // Move this line to the end of handleMouseDown
        };

        canvas.addEventListener("mousemove", draw);

        return () => {
          canvas.removeEventListener("mousemove", draw);
        };
      }
    }
  }, [state.isPainting, state.lineWidth, state.strokeStyle]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const canvasOffsetX = canvas.offsetLeft;
        const canvasOffsetY = canvas.offsetTop;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
      }
    }
    setState({ ...state, isPainting: true });

    // Add the following lines at the end of handleMouseDown
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const canvasOffsetX = canvas.offsetLeft;
        const canvasOffsetY = canvas.offsetTop;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
      }
    }
  };

  const handleMouseUp = () => {
    setState({ ...state, isPainting: false });
  };

  const handleClear = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const handleStrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, strokeStyle: e.target.value });
  };

  const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, lineWidth: parseInt(e.target.value, 10) });
  };

  return (
    <section className="h-screen flex">
      <div className="flex flex-col p-2 w-16 bg-gray-800">
        <h1 className="text-transparent bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text">
          Draw.
        </h1>
        <label htmlFor="stroke" className="text-white text-xs">
          Stroke
        </label>
        <input
          id="stroke"
          name="stroke"
          type="color"
          onChange={handleStrokeChange}
        />
        <label htmlFor="lineWidth" className="text-white text-xs">
          Line Width
        </label>
        <input
          id="lineWidth"
          name="lineWidth"
          type="number"
          value={state.lineWidth}
          onChange={handleLineWidthChange}
        />
        <button
          id="clear"
          className="bg-blue-600 text-white px-2 py-1 rounded"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <div className="flex-grow relative">
        <canvas
          id="drawing-board"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="absolute top-0 left-0"
        ></canvas>
      </div>
    </section>
  );
};

export default DrawingApp;
