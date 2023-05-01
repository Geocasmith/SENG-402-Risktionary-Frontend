import React from "react";
import DrawingCanvas from "./DrawingCanvas";
import ChatBox from "./Chatbox";
import TopBar from "../TopBar";

const Container: React.FC = () => {
  return (
    <>
      <TopBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 8em)",
        }}
      >
        <DrawingCanvas className="hidden md:block" /> {/* Add hidden and md:block here */}
        <ChatBox />
      </div>
    </>
  );
};

export default Container;