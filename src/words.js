// winning word list
const data = require("./wordlist.json");
const wordsArray = data[0].split("\n");

// Dictionary for english words with 5 letters
const dictionary = require('an-array-of-english-words');
const fiveLetterWords = dictionary.filter(word => word.length === 5);

let wordsObject = {};
fiveLetterWords.forEach(word => {
    wordsObject[word.toUpperCase()] = 1;
});

module.exports = {
    wordsArray,
    wordsObject
};