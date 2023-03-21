import React, { useRef, useState } from "react";
import { Component} from 'react';
import CanvasDraw from "react-canvas-draw";


function Whiteboard() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isPainting, setIsPainting] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");

    return (
     
      <CanvasDraw onChange={() => console.log(this.saveableCanvas.getSaveData())} />
    );
  }
  
  export default Whiteboard;
