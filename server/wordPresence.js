/**
 * Checks the presence of a word on the game board using depth-first search.
 * @param {Array<Array<string>>} board - The 2D gameboard array.
 * @param {string} word - The word to check for presence.
 * @returns {boolean} - True if the word is present on the board, false otherwise.
 */
function checkWordPresence(board, word) {

    // Create a 2D array to track visited positions on the board
    const visited = Array.from({ length: 4 }, () => Array(4).fill(false));

    // Define possible directions for adjacent letters
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];

    /**
     * Recursively searches for the next letter in the word.
     * @param {number} row - Current row index.
     * @param {number} col - Current column index.
     * @param {number} index - Current index in the word.
     * @returns {boolean} - True if the word is present starting from the current position, false otherwise.
     */
    const searchAdjacentLetters = (row, col, index) => {
        // Base case: the entire word has been found
        if (index === word.length) {
            return true;
        }

        // Check if the current position is out of bounds or has been visited
        if (row < 0 || row >= 4 || col < 0 || col >= 4 || visited[row][col]) {
            return false;
        }

        // Check if the current letter matches the corresponding letter in the word
        if (board[row][col].toLocaleLowerCase("fi-FI") !== word[index].toLocaleLowerCase("fi-FI")) {
            return false;
        }

        // Mark the current position as visited
        visited[row][col] = true;

        // Recursively search in all adjacent directions
        for (const [x, y] of directions) {
            const newRow = row + x;
            const newCol = col + y;

            if (searchAdjacentLetters(newRow, newCol, index + 1)) {
                return true;
            }
        }

        // Backtrack: mark the current position as not visited
        visited[row][col] = false;
        return false;
    };

    // Iterate through all positions on the board and initiate the search
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (searchAdjacentLetters(row, col, 0)) {
                // Reset visited array for future searches
                visited.forEach((row) => row.fill(false));
                return true;
            }
        }
    }

    // Reset visited array in case no match was found
    visited.forEach((row) => row.fill(false));

    // The word is not present on the board
    return false;
}

export {
    checkWordPresence
};
