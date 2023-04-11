import React from "react";

interface GameBorderProps {
  children: React.ReactNode;
}

const GameBorder: React.FC<GameBorderProps> = ({ children }) => {
  return (
    <div className="relative p-4 rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 shadow-lg rounded-lg z-[-1]"></div>
      <div className="relative bg-white from-yellow-400 via-red-600 to-pink-600 border-4 border-double border-yellow-500 shadow-md rounded-lg p-2">
        {children}
      </div>
    </div>
  );
};

export default GameBorder;

// import React from "react";

// interface GameBorderProps {
//   children: React.ReactNode;
// }

// const GameBorder: React.FC<GameBorderProps> = ({ children }) => {
//   return (
//     <div className="relative p-4 rounded-lg">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 shadow-lg rounded-lg z-[-1]"></div>
//       <div className="relative bg-gradient-to-br from-yellow-400 via-red-600 to-pink-600 border-4 border-double border-yellow-500 shadow-md rounded-lg p-2">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default GameBorder;
