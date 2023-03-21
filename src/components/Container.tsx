import React from "react";
import { Component} from 'react';
import CanvasDraw from "react-canvas-draw";


function Container() {
    return (
      <div id="ColourPicker">
        {/* <label>Colour</label> */}
        <input type="color"></input>
        <label>Width</label>
        <input id="lineWidth" name='lineWidth' type="number" value="5"></input>
        <button id="clear">Clear</button>
        
        <CanvasDraw onChange={() => console.log("onChange")} />
      </div>
    );
  }
  
  export default Container;
