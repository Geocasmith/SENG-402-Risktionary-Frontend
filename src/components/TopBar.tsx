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
            <button
              className="bg-yellow-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-yellow-300"
              onClick={() => {
                console.log("Profile button clicked");
              }}
            >
              <i className="fas fa-smile text-blue-600"></i>
            </button>
            <button
              className="bg-yellow-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-yellow-300"
              onClick={() => {
                console.log("Logout button clicked");
              }}
            >
              <i className="fas fa-door-open text-blue-600"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
