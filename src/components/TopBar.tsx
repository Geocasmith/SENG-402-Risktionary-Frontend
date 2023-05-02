import React from "react";

const TopBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r rounded from-blue-500 to-purple-600 p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold tracking-wide">
            <span className="text-yellow-300">Risk</span>tionary
          </h1>
          <div className="flex space-x-4">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
