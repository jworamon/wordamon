/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Row from './Row';
import { wordsArray, wordsObject } from './words';

const App = () => {
  const [winningWord, setWinningWord] = useState('');
  const [letterCounts, setLetterCounts] = useState({});
  const [guessingWords, setGuessingWords] = useState(Array(6).fill(''));
  const [currentWord, _setCurrentWord] = useState('');
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [colors, setColors] = useState([]);
  const [isWinning, setIsWinning] = useState(false);
  const [noneWordErr, setNoneWordErr] = useState('');

  const currentWordRef = useRef(currentWord);
  const setCurrentWord = (word) => {
    currentWordRef.current = word;
    _setCurrentWord(word);
  };

  // set winningWord and letterCounts
  useEffect(() => {
    if (winningWord === '') {
      const newWinningWord = wordsArray[Math.floor(Math.random() * 2315)].toUpperCase()
      let newLetterCounts = {};
      newWinningWord.split('').forEach(letter => {
        if (!newLetterCounts[letter]) {
          newLetterCounts[letter] = 1;
        } else {
          newLetterCounts[letter]++;
        }
      });

      setWinningWord(newWinningWord);
      setLetterCounts(newLetterCounts);

    }
  }, [winningWord]);


  // add keydown and keypress event listeners
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("keydown", handleKeyDown);
    }
  });

  // handle letter keys
  const handleKeyPress = (evt) => {
    if (currentRowIndex < 6 || !isWinning) {
      if (evt.key !== 'Enter' && currentWord.length < 5) {
        setCurrentWord(currentWordRef.current + evt.key.toUpperCase());
      }
    }
  }

  // handle backspace and enter keys
  const handleKeyDown = (evt) => {
    if (currentRowIndex < 6 || !isWinning) {
      if (evt.key === 'Backspace') {
        setCurrentWord(currentWordRef.current.slice(0, -1));
      }
      if (evt.key === 'Enter') {
        evt.preventDefault(); //prevent the browser from registering hitting enter key as clicking button

        // check if the word is valid
        const word = currentWordRef.current;
        if (!wordsObject[word]) {
          setNoneWordErr('INVALID WORD');
          setCurrentWord('');
        } else {
          // setCurrentRowIndex(currentRowIndexRef.current + 1);
          setCurrentRowIndex(idx => idx + 1);
          // ^^^ using the function as an argument allows us to access most recent state each time
          // without having to use useRef
          setNoneWordErr('');
        }
      }
    }
  }


  // listen for when currentWord changes (user types letter) 
  // then call updateGuessingWords
  useEffect(() => {
    updateGuessingWords(currentRowIndex);
  }, [currentWord]);


  // listen for when currentRowIndex changes (user hits enter)
  // then call checkLetterAndPosition and reset currentWord to an empty string
  useEffect(() => {
    if (currentRowIndex !== 0) {
      checkLetterAndPosition(currentWord);
      setCurrentWord('');
    }
  }, [currentRowIndex]);


  // after updating currentWord, update the word within guessingWords array
  const updateGuessingWords = (currentIndex) => {
    if (currentIndex < 6) {
      const updatedGuessingWords = [...guessingWords];
      updatedGuessingWords.splice(currentIndex, 1, currentWord);
      setGuessingWords(updatedGuessingWords);
    }
  }

  // after submitting a guess, check letters against winningWord and add colors
  const checkLetterAndPosition = (word) => {
    const workingLetterCounts = { ...letterCounts };
    const colorArr = [];

    //first, check if letter is at the right index
    word.split('').forEach((letter, idx) => {
      if (letter === winningWord[idx]) {
        colorArr.push('green');
        workingLetterCounts[letter]--;
      } else {
        colorArr.push('');
      }
    });

    //then check if winning word includes letter but not at correct index
    word.split('').forEach((letter, idx) => {
      if (letter !== winningWord[idx] && winningWord.includes(letter) && workingLetterCounts[letter]) {
        colorArr[idx] = 'yellow';
        workingLetterCounts[letter]--;
      }
    });

    setColors([...colors, colorArr]);

    if (word === winningWord) setIsWinning(true);

  }


  const startNewGame = (evt) => {
    setWinningWord('');
    setLetterCounts({});
    setGuessingWords(Array(6).fill(''));
    setCurrentWord('');
    setCurrentRowIndex(0);
    setColors([]);
    setIsWinning(false);
    setNoneWordErr('');
  }


  return (
    <div>
      <div className="main">
        <div className="gameResult">
          {noneWordErr}
          {isWinning ? 'CONGRATULATIONS!!' : ''}
          {!isWinning && currentRowIndex >= 6 ? `WINNING WORD: ${winningWord}` : ''}
        </div>

        <div className="gameBoard" onKeyPress={handleKeyPress} onKeyDown={handleKeyDown} >
          <Row word={guessingWords[0]} colors={colors[0]} />
          <Row word={guessingWords[1]} colors={colors[1]} />
          <Row word={guessingWords[2]} colors={colors[2]} />
          <Row word={guessingWords[3]} colors={colors[3]} />
          <Row word={guessingWords[4]} colors={colors[4]} />
          <Row word={guessingWords[5]} colors={colors[5]} />
        </div>

        <button onClick={startNewGame}>NEW GAME</button>

      </div>
    </div>

  );
}

export default App;
