import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import users from "./users.json" assert { type: "json" };

// Secret key for JWT signing
const secretKey = "PineapplesAreGreat";

/**
 * Handles the registration of a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
function register(req, res) {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: "Username is already taken" });
    }

    // Hash the password before storing it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: "Failed to register user" });
        }

        // Create a new user object with a unique ID, username, hashed password, token, and an empty games array
        const user = {
            id: generateUniqueId(),
            username,
            password: hashedPassword,
            token: generateToken(username),
            games: []
        };

        // Add the new user to the users array
        users.push(user);

        // Save the updated users array to the JSON file
        saveUsers(users);

        // Respond with a success message, user's token, and an empty games array
        res.status(200).json({ message: "Registration successful", token: user.token, games: user.games });
    });
}

/**
 * Handles user login.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
function login(req, res) {
    const { username, password } = req.body;

    // Find the user in the "users" array based on the provided username
    const user = users.find(user => user.username === username);

    // If the user does not exist, respond with an authentication error
    if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, result) => {
        // If there's an error or the password does not match, respond with an authentication error
        if (err || !result) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Generate a new token for the user
        const newToken = generateToken(username);

        // Update the user's token and save the updated users array to the JSON file
        user.token = newToken;
        saveUsers(users);

        // Respond with a success message, user's new token, and the user's games array
        res.status(200).json({ message: "Login successful", token: user.token, games: user.games });
    });
}

/**
 * Generates a unique identifier using the uuid library.
 * @returns {string} - Unique identifier.
 */
function generateUniqueId() {
    return uuidv4();
}

/**
 * Generates a JWT (JSON Web Token) for the given username.
 * @param {string} username - User's username.
 * @returns {string} - JWT for the user.
 */
function generateToken(username) {
    return jwt.sign({ username }, secretKey, { expiresIn: "15m" });
}

/**
 * Regenerates a new JWT for a user based on their old token.
 * @param {Object} oldToken - User's old JWT.
 * @returns {string} - New JWT for the user.
 */
function regenerateToken(oldToken) {
    const {username} = oldToken;
    const newToken = generateToken(username);
    return newToken;
}

/**
 * Saves the users array to the users.json file.
 * @param {Array} users - Array of user objects.
 */
function saveUsers(users) {
    try {
        fs.writeFileSync("./users.json", JSON.stringify(users), "utf8");
    } catch (error) {
        console.error("Failed to save users", error);
    }
}

/**
 * Verifies the authenticity of a JWT.
 * @param {string} token - User's JWT.
 * @returns {Object|null} - Decoded payload of the token or null if verification fails.
 */
function verifyToken(token) {
    let tokenString = "";

    // Check if the token is a string or part of a request body
    if (typeof (token) === "string") {
        tokenString = token;
    } else {
        tokenString = token.body.token;
    }
    
    try {
        // Verify the token and return the decoded payload if successful
        const tokenPayload = jwt.verify(tokenString, secretKey);
        return tokenPayload;
    } catch (error) {
        // Log an error message if verification fails and return null
        console.error("Failed to verify token", error);
        return null;
    }
}

export {
    register,
    login,
    verifyToken,
    regenerateToken,
    saveUsers,
    users
};