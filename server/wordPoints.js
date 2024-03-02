/**
 * Calculates the point value for a given word based on its length and the original rules of Boggle.
 * @param {string} word - The word for which to calculate points.
 * @returns {number} - The calculated point value for the word.
 */
function calculateWordPoints(word) {
    if (word.length >= 3 && word.length <= 4) {
        return 1;
    } else if (word.length === 5) {
        return 2;
    } else if (word.length === 6) {
        return 3;
    } else if (word.length === 7) {
        return 5;
    } else if (word.length >= 8) {
        return 11;
    } else {
        return 0;
    }
}

export {
    calculateWordPoints
};
