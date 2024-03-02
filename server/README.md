# Boggle Word Game Server

This server implements a Boggle word game, where users can register, login, and play the Boggle game. 

The server uses Express.js for handling HTTP requests and includes features like user authentication, game creation, word search from the gameboard, word validation, and word point calculation.

## Prerequisites

Before running the server, ensure that you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)

## Setup

1. Install dependencies:

```
npm install 
```

2. Start the server:

```
npm start
```

The server will run on port 3001 by default.

## Endpoints

/register: Register a new user.

/login: Log in with an existing user.

/verify-token: Verify the authenticity of a user token.

/start: Start a new game.

/submit-word: Submit a word for points.

## Files

### game.js

This file contains the game-related functionality, including starting a new game, submitting words, and verifying game tokens.

### user.js

This file handles user-related tasks such as user registration, login, token generation, and user data storage.

### dictionary.js

A module for checking the validity of words using a dictionary.

### wordPresence.js

A module for checking the presence of a given word on the gameboard.

### wordPoints.js

A module for calculating points based on the length of submitted words.

### gameboard.js

A module for generating the gameboard using dice.json.

### dice.json

A JSON file containing the dice configuration used for generating the gameboard.

### users.json

A JSON file storing user information, including usernames, hashed passwords, authentication tokens, and game data.

## Notes

User data is stored in users.json.

Dice configuration is stored in dice.json.

The server uses bcrypt for password hashing and JWT for token generation.   