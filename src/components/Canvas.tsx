import React, { useRef, useEffect, useState } from 'react';

type Point = {
  x: number;
  y: number;
};

type Props = {
  width: number;
  height: number;
};

const Canvas: React.FC<Props> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const startDrawing = (event: MouseEvent) => {
    setDrawing(true);
    draw(event);
  };

  const stopDrawing = () => {
    setDrawing(false);
    context && context.beginPath();
  };

  const draw = (event: MouseEvent) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        setContext(context);
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
    //   onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
    //   onMouseMove={draw}
      className="border border-gray-300"
    />
  );
};

export default Canvas;
