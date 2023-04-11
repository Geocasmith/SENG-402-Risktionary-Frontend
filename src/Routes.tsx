import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import SignUp from "./components/login/SignUp";
import Login from "./components/login/Login";
import DisplayVotes from "./components/Vote/Heatmap";
import Slides from "./components/game/Slides";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/display" element={<DisplayVotes />} />
        <Route path="/info" element={<Slides />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
