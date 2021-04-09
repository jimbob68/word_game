import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import Keyboard from './Keyboard.js';

const GameBoard = ({ bankOfWords, setBankOfWords, categoryChosen, getTvShowNames, allHints }) => {
	const [ wordToGuess, setWordToGuess ] = useState('');
	const [ guessedCharacters, setGuessedCharacters ] = useState([]);
	const [ answer, setAnswer ] = useState('');
	const [ numberOfLivesLeft, setNumberOfLivesLeft ] = useState(7);
	const [ hint, setHint ] = useState([]);
	const [ showHint, setShowHint ] = useState(false);

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
				if (wordToGuess.charAt(i) === ' ') {
					dashesForWordToGuess += '/ ';
				} else if (!/[a-zA-Z0-9]/.test(wordToGuess.charAt(i))) {
					dashesForWordToGuess += wordToGuess.charAt(i) + ' ';
				} else {
					dashesForWordToGuess += '_ ';
				}
			}
			setAnswer(dashesForWordToGuess);
		}
	};

	const checkIfCharacterIsCorrect = () => {
		let displayedAnswer = answer;
		console.log('ANSWER', answer);
		console.log('GUESSED CHARTACTERS', guessedCharacters);
		if (guessedCharacters.length > 0) {
			for (let i = 0; i < wordToGuess.length; i++) {
				if (
					wordToGuess.charAt(i).toLowerCase() ===
					guessedCharacters[guessedCharacters.length - 1].toLowerCase()
				) {
					let splitAnswer = displayedAnswer.split(' ');
					console.log('splitAnswer', splitAnswer);
					splitAnswer[i] = guessedCharacters[guessedCharacters.length - 1];
					let joinedAnswer = splitAnswer.join(' ');
					console.log('joinedAnswer', joinedAnswer);
					displayedAnswer = joinedAnswer;
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
		setHint(allHints[randomIndex]);
		console.log('bankOfWords:', bankOfWords[randomIndex]);
		console.log('hint:', allHints[randomIndex]);
		console.log('All Hints:', allHints);
	};

	const handleNewGame = () => {
		getWordToGuess();
		setGuessedCharacters([]);
		setNumberOfLivesLeft(7);
		setShowHint(false);
		if (categoryChosen === 'TV Shows') {
			getTvShowNames('tv');
		} else if (categoryChosen === 'Movies') {
			getTvShowNames('movie');
		}
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

	const displayHint = () => {
		if (showHint === false) {
			return <button onClick={() => setShowHint(true)}>Hint</button>;
		}
		if (categoryChosen === 'TV Shows' || categoryChosen === 'Movies') {
			return <p>Genres: {hint.join(', ')}</p>;
		} else if (categoryChosen === 'Country Names') {
			return <p>Region: {hint}</p>;
		} else if (categoryChosen === 'Capital Names') {
			return <p>Capital of: {hint}</p>;
		}
	};

	return (
		<div>
			<p>Lives Left: {numberOfLivesLeft}</p>
			<img src={require('../images/' + numberOfLivesLeft + '.png').default} alt={numberOfLivesLeft} />
			<br />
			{displayWrongGuesses()}
			{hint && displayHint()}
			{/* {hint && <button onClick={() => displayHint()}>Hint</button>} */}
			<p>{answer}</p>
			{!answer.includes('_') && (
				<div>
					<p>Congratulations! You have won this game!</p>
					<button onClick={() => handleNewGame()}>New Game</button>
					<button onClick={() => setBankOfWords([])}>Select another Category</button>
				</div>
			)}
			{numberOfLivesLeft === 0 && (
				<div>
					<p>Congratulations! You have lost this game! My kid sister would whup you at scrabble!!!</p>
					<p>The answer that somehow managed to evade your inferior intellect was {wordToGuess}!!!</p>
					<button onClick={() => handleNewGame()}>New Game</button>
					<button onClick={() => setBankOfWords([])}>Select another Category</button>
				</div>
			)}
			{answer.includes('_') &&
			numberOfLivesLeft > 0 && (
				<Keyboard guessedCharacters={guessedCharacters} setGuessedCharacters={setGuessedCharacters} />
			)}
		</div>
	);
};
export default GameBoard;
