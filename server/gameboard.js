import dice from "./dice.json" assert { type: "json" };

/**
 * Generates a gameboard using a shuffled set of dice.
 * @returns {Array} - A 2D array representing the gameboard.
 */
function generateGameboard() {
    const gameboard = [];
    const shuffledDice = shuffleDice();

    shuffledDice.forEach((die) => {
        const index = Math.floor(Math.random() * die.length);
        const letter = die[index];
        gameboard.push(letter);
    });
    return convertToBoard(gameboard);
}

/**
 * Shuffles the dice configuration to introduce randomness.
 * @returns {Array} - A shuffled copy of the original dice configuration.
 */
function shuffleDice() {
    const diceCopy = JSON.parse(JSON.stringify(dice));
    for (let i = diceCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [diceCopy[i], diceCopy[j]] = [diceCopy[j], diceCopy[i]];
    }
    return diceCopy;
}

/**
 * Converts a flat array to a 2D array with the specified number of columns.
 * @param {Array} list - The flat array to be converted.
 * @returns {Array} - A 2D array with rows and columns.
 */
function convertToBoard(list) {
    const board = [];
    for (let i = 0; i < list.length; i += 4) {
        const row = list.slice(i, i + 4);
        board.push(row);
    }
    return board;
}

export {
    generateGameboard
};
