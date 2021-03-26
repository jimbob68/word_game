import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import Keyboard from './Keyboard.js';

const GameBoard = () => {
	const [ wordToGuess, setWordToGuess ] = useState('');
	const [ bankOfWords, setBankOfWords ] = useState([]);
	const [ guessedCharacters, setGuessedCharacters ] = useState([]);
	const [ answer, setAnswer ] = useState('');

	useEffect(() => {
		setBankOfWords([ 'cat', 'dog', 'fish', 'horse budgie', 'doorstopper' ]);
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
			setAnswer((answer) => displayedAnswer);
		}
	};

	const getWordToGuess = () => {
		const randomIndex = Math.floor(Math.random() * bankOfWords.length);
		setWordToGuess(bankOfWords[randomIndex]);
		console.log('bankOfWords:', bankOfWords[randomIndex]);
		// return bankOfWords[randomIndex];
	};

	return (
		<div>
			<p>game board</p>
			<p>{guessedCharacters.join(', ')}</p>
			{/* {wordToGuess && displayDashesForWordToGuess()} */}
			<p>{answer}</p>
			<Keyboard guessedCharacters={guessedCharacters} setGuessedCharacters={setGuessedCharacters} />
		</div>
	);
};
export default GameBoard;
