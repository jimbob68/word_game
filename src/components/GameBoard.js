import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import Keyboard from './Keyboard.js';

const GameBoard = ({ bankOfWords, setBankOfWords, categoryChosen, getTvShowNames, allHints, getMovieStars }) => {
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
					dashesForWordToGuess += ' / ';
				} else if (!/[a-zA-Z0-9]/.test(wordToGuess.charAt(i))) {
					dashesForWordToGuess += wordToGuess.charAt(i);
				} else {
					dashesForWordToGuess += '_';
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
					let splitAnswer = displayedAnswer.split('');
					const splitAnswerNoSpaces = splitAnswer.filter((character) => character !== ' ');
					console.log('splitAnswer', splitAnswer);
					splitAnswerNoSpaces[i] = guessedCharacters[guessedCharacters.length - 1];
					let joinedAnswer = splitAnswerNoSpaces.join('');
					joinedAnswer = joinedAnswer.replaceAll('/', ' / ');
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
		} else if (categoryChosen === 'Movie Stars') {
			getMovieStars();
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
			return (
				<button className="game-button" onClick={() => setShowHint(true)}>
					Hint
				</button>
			);
		}
		if (categoryChosen === 'TV Shows' || categoryChosen === 'Movies') {
			return <p>Genres: {hint.join(', ')}</p>;
		} else if (categoryChosen === 'Country Names') {
			return <p>Region: {hint}</p>;
		} else if (categoryChosen === 'Capital Names') {
			return <p>Capital of: {hint}</p>;
		} else if (categoryChosen === 'Movie Stars') {
			return <p>Starred in: {hint}</p>;
		}
	};

	return (
		<div>
			<p>Lives Left: {numberOfLivesLeft}</p>
			<img
				className="hangman-image"
				src={require('../images/' + numberOfLivesLeft + '.png').default}
				alt={numberOfLivesLeft}
			/>
			<br />
			<div className="wrong-guesses">{displayWrongGuesses()}</div>
			<div className="hint-text">{hint && displayHint()}</div>
			{/* {hint && <button onClick={() => displayHint()}>Hint</button>} */}
			<div className="x">
				<p className="answer-text">{answer}</p>
			</div>
			{!answer.includes('_') && (
				<div>
					<p>Congratulations! You have won this game!</p>
					<button className="game-button" onClick={() => handleNewGame()}>
						New Game
					</button>
					<button className="game-button" onClick={() => setBankOfWords([])}>
						Select another Category
					</button>
				</div>
			)}
			{numberOfLivesLeft === 0 && (
				<div>
					<p className="wrong-answer-message">
						Sorry you were unsuccessful this time! The answer was <b>{wordToGuess}!</b>
					</p>
					<button className="game-button" onClick={() => handleNewGame()}>
						New Game
					</button>
					<button className="game-button" onClick={() => setBankOfWords([])}>
						Select another Category
					</button>
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
