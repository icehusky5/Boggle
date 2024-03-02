import express from "express";
import cors from "cors";
import game from "./game.js";
import {register, login} from "./user.js";

// Creating an Express server instance
const server = express();

// Middleware setup
server.use(express.json());
server.use(cors());

// Setting up routes for user registration and login
server.post("/register", register);
server.post("/login", login);

// Setting up routes for game-related functionality
server.post("/verify-token", game.verifyGameToken);
server.post("/start", game.startGame);
server.post("/submit-word", game.submitWord);

// Setting the server to listen on port 3001
const port = 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
