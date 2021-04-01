import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import Keyboard from './Keyboard.js';

const GameBoard = () => {
	const [ wordToGuess, setWordToGuess ] = useState('');
	const [ bankOfWords, setBankOfWords ] = useState([]);
	const [ guessedCharacters, setGuessedCharacters ] = useState([]);
	const [ answer, setAnswer ] = useState('');
	const [ numberOfLivesLeft, setNumberOfLivesLeft ] = useState(7);

	useEffect(() => {
		setBankOfWords([ 'cat', 'dog', 'fish', 'horse budgie', 'doorstopper', 'Bull Dog' ]);
	}, []);

	useEffect(
		() => {
			getWordToGuess();
		},
		[ bankOfWords ]
	);

	useEffect(
		() => {
			displayDashesForWordToGuess();
		},
		[ wordToGuess ]
	);
	useEffect(
		() => {
			checkIfCharacterIsCorrect();
		},
		[ guessedCharacters ]
	);

	const displayDashesForWordToGuess = () => {
		let dashesForWordToGuess = '';
		if (wordToGuess) {
			for (let i = 0; i < wordToGuess.length; i++) {
				if (wordToGuess.charAt(i) !== ' ') {
					dashesForWordToGuess += '_ ';
				} else {
					dashesForWordToGuess += '/ ';
				}
			}
			setAnswer(dashesForWordToGuess);
		}
		// return dashesForWordToGuess;
	};

	const checkIfCharacterIsCorrect = () => {
		let displayedAnswer = answer;
		if (guessedCharacters.length > 0) {
			for (let i = 0; i < wordToGuess.length; i++) {
				if (
					wordToGuess.charAt(i).toLowerCase() ===
					guessedCharacters[guessedCharacters.length - 1].toLowerCase()
				) {
					let splitAnswer = displayedAnswer.split(' ');
					splitAnswer[i] = guessedCharacters[guessedCharacters.length - 1];
					let joinedAnswer = splitAnswer.join(' ');
					displayedAnswer = joinedAnswer;
					// setAnswer(displayedAnswer);
					// } else if (wordToGuess.charAt(i) !== ' ') {
					// 	dashesForWordToGuess += '_ ';
					// } else {
					// 	dashesForWordToGuess += '/ ';
				}
			}
			if (
				!wordToGuess.toLowerCase().includes(guessedCharacters[guessedCharacters.length - 1].toLowerCase()) &&
				numberOfLivesLeft > 0
			) {
				setNumberOfLivesLeft(numberOfLivesLeft - 1);
			}
			setAnswer((answer) => displayedAnswer);
		}
	};

	const getWordToGuess = () => {
		const randomIndex = Math.floor(Math.random() * bankOfWords.length);
		setWordToGuess(bankOfWords[randomIndex]);
		console.log('bankOfWords:', bankOfWords[randomIndex]);
		// return bankOfWords[randomIndex];
	};

	const handleNewGame = () => {
		// getWordToGuess();
		// setGuessedCharacters([]);
		// // setAnswer('');
		// setNumberOfLivesLeft(7);
		window.location.reload();
	};

	const displayWrongGuesses = () => {
		let wrongGuesses = [];
		guessedCharacters.forEach((guessedCharacter) => {
			if (!wordToGuess.toLowerCase().includes(guessedCharacter.toLowerCase())) {
				wrongGuesses.push(guessedCharacter);
			}
		});
		return wrongGuesses.join(', ');
	};

	return (
		<div>
			<p>game board</p>
			<p>Lives Left:{numberOfLivesLeft}</p>
			{displayWrongGuesses()}
			{/* <p>{guessedCharacters.join(', ')}</p> */}
			{/* {wordToGuess && displayDashesForWordToGuess()} */}
			<p>{answer}</p>
			{!answer.includes('_') && (
				<div>
					<p>Congratulations! You have won this game!</p>
					<button onClick={() => handleNewGame()}>New Game</button>
				</div>
			)}
			{numberOfLivesLeft === 0 && (
				<div>
					<p>Congratulations! You have lost this game! My kid sister would whup you at scrabble!!!</p>
					<p>The answer that somehow managed to evade your inferior intellect was {wordToGuess}!!!</p>
					<button onClick={() => handleNewGame()}>New Game</button>
				</div>
			)}
			{console.log('wordToGuess', wordToGuess)}
			{console.log('answer', answer)}
			{answer.includes('_') &&
			numberOfLivesLeft > 0 && (
				<Keyboard guessedCharacters={guessedCharacters} setGuessedCharacters={setGuessedCharacters} />
			)}
		</div>
	);
};
export default GameBoard;
