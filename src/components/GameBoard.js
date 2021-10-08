import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import Keyboard from './Keyboard.js';
import Modal from 'react-modal';

const GameBoard = ({
	bankOfWords,
	setBankOfWords,
	categoryChosen,
	getTvShowNames,
	allHints,
	getMovieStars,
	getPokemon,
	setAllHints,
	countriesResults,
	getFootballTeams,
	getDogBreeds,
	getStarWarsCharacters
}) => {
	const [ wordToGuess, setWordToGuess ] = useState('');
	const [ guessedCharacters, setGuessedCharacters ] = useState([]);
	const [ answer, setAnswer ] = useState('');
	const [ numberOfLivesLeft, setNumberOfLivesLeft ] = useState(7);
	const [ hint, setHint ] = useState([]);
	const [ showHint, setShowHint ] = useState(false);
	const [ modalIsOpen, setModalIsOpen ] = useState(false);

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
		// if (categoryChosen === 'Country Names') {
		// 	let countryHint = 'Island';
		// 	countriesResults.forEach((result) => {
		// 		console.log('result.Alpha3:', result.alpha3Code);
		// 		if (result.alpha3Code === allHints[randomIndex]) {
		// 			countryHint = result.name;
		// 		}
		// 	});
		// 	console.log('countryHint:', countryHint);
		// 	console.log('countriesResults', countriesResults);

		// 	setHint(countryHint);
		// } else {
			setHint(allHints[randomIndex]);
		// }

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
			setAllHints([]);
		} else if (categoryChosen === 'Movies') {
			getTvShowNames('movie');
			setAllHints([]);
		} else if (categoryChosen === 'Movie Stars') {
			getMovieStars();
			setAllHints([]);
		} else if (categoryChosen === 'Pokemon') {
			getPokemon();
			setAllHints([]);
		} else if (categoryChosen === 'Football Teams') {
			getFootballTeams();
			setAllHints([]);
		} else if (categoryChosen === 'Dog Breeds') {
			getDogBreeds();
			setAllHints([]);
		} else if (categoryChosen === 'StarWars Characters') {
			getStarWarsCharacters();
			setAllHints([]);
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
		} else {
			if (categoryChosen === 'TV Shows' || categoryChosen === 'Movies') {
				return <p>Genres: {hint.join(', ')}</p>;
			} else if (categoryChosen === 'Country Names') {
				return <div>
					<img src={hint} onClick={() => setModalIsOpen(true)} className="flag-image" alt="flag"/>
					<p className="flag-text">click to enlarge</p>
				</div>
				// if (hint === 'Island') {
				// 	return <p>This is an Island</p>;
				// } else {
				// 	return <p>Neighbouring Country: {hint}</p>;
				// }
			} else if (categoryChosen === 'Capital Cities') {
				return <p>Capital of {hint}</p>;
			} else if (categoryChosen === 'Movie Stars') {
				return <p>Starred in {hint}</p>;
			} else if (categoryChosen === 'Pokemon') {
				setModalIsOpen(true);
				setShowHint(false);
				// return <img className="pokemon-image" src={hint} alt="Pokemon" />;
			} else if (categoryChosen === 'Football Teams') {
				return <p>This team plays in {hint}</p>;
			} else if (categoryChosen === 'Songs') {
				return <p>Artist: {hint}</p>;
			} else if (categoryChosen === 'Dog Breeds') {
				setModalIsOpen(true);
				setShowHint(false);
				// return <img className="pokemon-image" src={hint} alt="Dog Breed" />;
			} else if (categoryChosen === 'StarWars Characters') {
				return <p>Homeworld planet is {hint}</p>;
			}
		}
	};

	return (
		<div>
			<p>Game Mode: {categoryChosen}</p>
			<p className={numberOfLivesLeft <= 3 ? 'lives-left-text red-text' : 'lives-left-text'}>
				Lives Left: {numberOfLivesLeft}
			</p>
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
					<button
						className="game-button"
						onClick={() => {
							setBankOfWords([]);
							setAllHints([]);
						}}
					>
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
					<button
						className="game-button"
						onClick={() => {
							setBankOfWords([]);
							setAllHints([]);
						}}
					>
						Select another Category
					</button>
				</div>
			)}
			{answer.includes('_') &&
			numberOfLivesLeft > 0 && (
				<Keyboard guessedCharacters={guessedCharacters} setGuessedCharacters={setGuessedCharacters} />
			)}
			<Modal className="modal-window" appElement={document.getElementById('root')} isOpen={modalIsOpen}>
				<button className="modal-close-button" onClick={() => setModalIsOpen(false)}>
					Close
				</button>
				<img className="hint-image" src={hint} alt="hint" />
			</Modal>
		</div>
	);
};
export default GameBoard;
