import fs from "fs";
import path from "path";

/**
 * Checks the validity of a word by looking it up in a dictionary file.
 * @param {string} word - The word to be checked for validity.
 * @returns {boolean} - True if the word is valid, false otherwise.
 */
function checkWordValidity(word) {
    const letter = word[0].toUpperCase();
    const dictionaryPath = path.join("../words", `${letter}.json`);
    const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'));
    const lowercaseWord = word.toLocaleLowerCase("fi-FI");
    const result = dictionary.some((entry) => entry.toLocaleLowerCase("fi-FI") === lowercaseWord);
    return result;
}

export {
    checkWordValidity
};
