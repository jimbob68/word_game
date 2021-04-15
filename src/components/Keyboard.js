import React from 'react';
import './Keyboard.css';
import CharacterButton from './CharacterButton.js';
const Keyboard = ({ guessedCharacters, setGuessedCharacters }) => {
	const lettersForKeyboard = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'0',
		'Q',
		'W',
		'E',
		'R',
		'T',
		'Y',
		'U',
		'I',
		'O',
		'P',
		'A',
		'S',
		'D',
		'F',
		'G',
		'H',
		'J',
		'K',
		'L',
		'Z',
		'X',
		'C',
		'V',
		'B',
		'N',
		'M'
	];

	const characterForButton = () => {
		return lettersForKeyboard.map((letter) => {
			return (
				<CharacterButton
					buttonCharacter={letter}
					guessedCharacters={guessedCharacters}
					setGuessedCharacters={setGuessedCharacters}
				/>
			);
		});
	};

	return <div className="keyboard">{characterForButton()}</div>;
};
export default Keyboard;
