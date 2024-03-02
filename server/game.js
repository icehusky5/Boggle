import { v4 as uuidv4 } from "uuid";
import { generateGameboard } from "./gameboard.js";
import { checkWordValidity } from "./dictionary.js";
import { checkWordPresence } from "./wordPresence.js";
import { calculateWordPoints } from "./wordPoints.js";
import { verifyToken, regenerateToken, saveUsers, users } from "./user.js";

/**
 * Initiates a new game for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
function startGame(req, res) {
    // Extract authorization token from the request headers
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // Verify the token and decode user information
    const decodedToken = verifyToken(token);

    // If the token is invalid, return an unauthorized error response
    if (!decodedToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract the username from the decoded token
    const username = decodedToken.username;

    // Generate a unique game ID using UUID
    const gameId = uuidv4();

    // Generate a new gameboard
    const gameboard = generateGameboard();

    // Initialize starting points and an empty array for submitted words
    const startingPoints = 0;
    const submittedWords = [];

    // Find the user in the "users" array based on the username
    const user = users.find(user => user.username === username);
    let games = null;

    // If the user exists, retrieve their games array; otherwise, return a user not found error
    if (user) {
        games = user.games;
    } else {
        return res.status(404).json({ error: "User not found" });
    }

    // Create a new game object
    const newGame = {
        gameId,
        gameboard,
        points: startingPoints,
        submittedWords,
    };
    
    // Add the new game to the user's games array
    games.push(newGame);

    // Flatten the gameboard for the response
    const flatGameboard = gameboard.flat();

    // Generate a new token
    const newToken = regenerateToken(decodedToken);

    // Respond with game information, including game ID, flattened gameboard, starting points, and a new token
    res.json({
        gameId,
        flatGameboard,
        points: startingPoints,
        newToken,
    });

}

/**
 * Handles the submission of a word for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
function submitWord(req, res) {
    // Extract authorization token from the request headers
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // Verify the token and decode user information
    const decodedToken = verifyToken(token);

    // If the token is invalid, return an unauthorized error response
    if (!decodedToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract the username from the decoded token
    const username = decodedToken.username;

    // Find the user in the "users" array based on the username
    const user = users.find(user => user.username === username);
    let games = null;

    // If the user exists, retrieve their games array; otherwise, return a user not found error
    if (user) {
        games = user.games;
    } else {
        return res.status(404).json({ error: "User not found" });
    }

    // Extract game ID and submitted word from the request body
    const { gameId, word } = req.body;

    // Find the game in the user's games array based on the game ID
    const game = games.find(game => game.gameId === gameId);

    // If the game is not found, return a game not found error
    if (!game) {
        return res.status(404).json({ error: "Game not found" });
    }

    // Trim the submitted word
    const trimmedWord = word.trim();

    // Check the validity of the word using the dictionary
    const isValidWord = checkWordValidity(trimmedWord);

    // Check if the word is present on the gameboard
    const isPresent = checkWordPresence(game.gameboard, trimmedWord);

    // Check if the word has already been submitted in this game
    const isAlreadySubmitted = game.submittedWords.includes(trimmedWord);

    // If the word is valid, present on the gameboard, and not already submitted, process it
    if (isValidWord && isPresent && !isAlreadySubmitted) {
        // Calculate points for the submitted word
        const wordPoints = calculateWordPoints(trimmedWord);

        // Update game points and submitted words array
        game.points += wordPoints;
        game.submittedWords.push(trimmedWord);
    }

    // Save the modified 'users' array to the users.json file
    saveUsers(users);

    // Generate a new token
    const newToken = regenerateToken(decodedToken);

    // Respond with information about the validity of the word, points, and a new token
    res.json({
        valid: isValidWord && isPresent && !isAlreadySubmitted,
        points: game.points,
        newToken,
    });
}

/**
 * Verifies the authenticity of a game token and retrieves user information and games.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
function verifyGameToken(req, res) {
    // Extract the game token from the request body
    const { token } = req.body;

    try {
        // Verify the game token and decode user information
        const response = verifyToken(token);

        // If the verification is successful, proceed
        if (response) {
            // Extract the username from the decoded token
            const username = response.username;

            // Find the user in the "users" array based on the username
            const user = users.find(user => user.username === username);
            let games = null;

            // If the user exists, retrieve their games array; otherwise, return a user not found error
            if (user) {
                games = user.games;
            } else {
                return res.status(404).json({ error: "User not found" });
            }

            // Respond with information about the validity of the token, decoded user information, and user's games
            res.status(200).json({ isValid: true, response, games });
        } else {
            // If the verification fails, return an unauthorized error response
            res.status(401).json({ isValid: false });
        }
    } catch (error) {
        // If an error occurs during verification, return an unauthorized error response
        res.status(401).json({ isValid: false });
    }
    
}

export default {
    startGame,
    submitWord,
    verifyGameToken
};
