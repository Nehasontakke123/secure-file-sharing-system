// config/env.js
// Loads environment variables safely

import dotenv from "dotenv";

const loadEnv = () => {
  dotenv.config();
};

export default loadEnv;
