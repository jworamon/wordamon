/*

---------> THIS IS AN OLD VERSION OF APP.JS USING CLASS COMPONENT

import React from 'react';
import './App.css';
import Row from '../src/Row';
import { wordsArray, wordsObject } from '../src/words';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      winningWord: '',
      letterCounts: {},
      guessingWords: [],
      currentRowIndex: 0,
      currentWorkingWord: '',
      colors: [],
      isWinning: false,
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateGuessingWords = this.updateGuessingWords.bind(this);
    this.checkLetterAndPosition = this.checkLetterAndPosition.bind(this);
  }

  componentDidMount() {
    const guessingWords = Array(6).fill('');
    this.setState({ guessingWords: guessingWords });

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keypress", this.handleKeyPress);

    const winningWord = wordsArray[Math.floor(Math.random() * 2315)].toUpperCase();
    let letterCounts = {};

    winningWord.split('').forEach(letter => {
      if (!letterCounts[letter]) {
        letterCounts[letter] = 1;
      } else {
        letterCounts[letter]++;
      }
    });

    this.setState({ winningWord: winningWord, letterCounts: letterCounts });
  }

  handleKeyDown(evt) {
    if (!this.state.isWinning) {
      if (evt.key === 'Backspace') {
        this.setState({ currentWorkingWord: this.state.currentWorkingWord.slice(0, -1) });
        this.updateGuessingWords(this.state.currentRowIndex);
      }

      if (evt.key === 'Enter') {
        this.checkLetterAndPosition(this.state.currentWorkingWord);
        this.setState({ currentRowIndex: this.state.currentRowIndex + 1, currentWorkingWord: '' });
      }
    }
  }

  handleKeyPress(evt) {
    if (!this.state.isWinning) {
      if (evt.key !== 'Enter') {
        this.setState({ currentWorkingWord: this.state.currentWorkingWord + evt.key.toUpperCase() })
        this.updateGuessingWords(this.state.currentRowIndex);
      }
    }
  }

  updateGuessingWords(currentIndex) {
    const updatedGuessingWords = this.state.guessingWords;
    updatedGuessingWords.splice(currentIndex, 1, this.state.currentWorkingWord);
    this.setState({ guessingWords: updatedGuessingWords });
  }

  checkLetterAndPosition(guessingWord) {
    const winningWord = this.state.winningWord;
    const letterCount = { ...this.state.letterCounts };
    const colorArr = [];

    //check if letter is at the right index first
    guessingWord.split('').forEach((letter, idx) => {
      if (letter === winningWord[idx]) {
        colorArr.push('green');
        letterCount[letter]--;
      } else {
        colorArr.push('');
      }
    });

    //check if winning word includes letter but not at correct index
    guessingWord.split('').forEach((letter, idx) => {
      if (letter !== winningWord[idx] && winningWord.includes(letter) && letterCount[letter]) {
        colorArr[idx] = 'yellow';
        letterCount[letter]--;
      }
    });

    this.setState({ colors: [...this.state.colors, colorArr] });

    if (guessingWord === winningWord) this.setState({ isWinning: true });

  }

  render() {
    const { guessingWords, colors, currentRowIndex, winningWord, isWinning } = this.state;

    return (
      <div className="main" onKeyPress={this.handleKeyPress} onKeyDown={this.handleKeyDown} >
        <div className="gameResult">
          {isWinning ? 'CONGRATULATIONS!!' : ''}
          {currentRowIndex >= 6 ? `WINNING WORD: ${winningWord}` : ''}
        </div>
        <div className="gameBoard">
          <Row word={guessingWords[0]} colors={colors[0]} />
          <Row word={guessingWords[1]} colors={colors[1]} />
          <Row word={guessingWords[2]} colors={colors[2]} />
          <Row word={guessingWords[3]} colors={colors[3]} />
          <Row word={guessingWords[4]} colors={colors[4]} />
          <Row word={guessingWords[5]} colors={colors[5]} />
        </div>
      </div>

    );

  }

}

export default Appp;

*/
