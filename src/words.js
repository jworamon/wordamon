const data = require("./wordlist.json");
const wordsArray = data[0].split("\n");

let wordsObject = {};
wordsArray.forEach(word => {
    wordsObject[word] = 1;
});

module.exports = {
    wordsArray,
    wordsObject
};