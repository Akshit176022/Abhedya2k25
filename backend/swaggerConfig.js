const swaggerAutogen = require("swagger-autogen")();

// const doc = {
//   info: {
//     title: "Leaderboard and User Management API",
//     description: "Abhedya's backend",
//   },
//   host: "localhost:3000", 
//   schemes: ["http"], 
// };

const outputFile = "./swagger-output.json"; 
const endpointsFiles = ["./app.js"]; 

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log("Swagger documentation generated!");
});
