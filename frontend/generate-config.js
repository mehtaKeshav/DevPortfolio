const fs = require("fs");

// Load environment variables from .env file
require("dotenv").config();

// Replace placeholders in config.template.js
const template = fs.readFileSync("./frontend/config.template.js", "utf8");

const config = template
  .replace("REPLACE_API_BASE_URL", process.env.API_BASE_URL)

// Write the final config.js to the frontend directory
fs.writeFileSync("./frontend/config.js", config);

console.log("config.js has been generated with environment variables!");
