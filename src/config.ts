// config.ts
export function getSocketConnectionConfig() {
    if (process.env.NODE_ENV === "development") {
      return {
        url: "http://localhost:3001",
        options: {},
      };
    } else {
      return {
        url: "https://csse-risk1.canterbury.ac.nz:3001",
        options: { secure: true, transports: ["websocket"] },
      };
    }
  }
  