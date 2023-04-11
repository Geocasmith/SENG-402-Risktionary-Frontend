import React from "react";
import DrawingCanvas from "./DrawingCanvas";
import ChatBox from "./Chatbox";

const Container: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <DrawingCanvas />
      <ChatBox />
    </div>
  );
};

export default Container;
