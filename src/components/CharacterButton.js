import React, { useState, useEffect } from 'react';
import './CharacterButton.css';
const CharacterButton = ({ buttonCharacter, guessedCharacters, setGuessedCharacters }) => {
	const [ characterAlreadySelected, setCharacterAlreadySelected ] = useState(false);

	useEffect(
		() => {
			if (!guessedCharacters.includes(buttonCharacter)) {
				setCharacterAlreadySelected(false);
			}
		},
		[ guessedCharacters ]
	);
	const handleCharacterButtonClick = () => {
		setGuessedCharacters((guessedCharacters) => [ ...guessedCharacters, buttonCharacter ]);
		setCharacterAlreadySelected(true);
	};

	return (
		<div className="character-div" id={buttonCharacter}>
			<button
				className="character-key"
				onClick={() => handleCharacterButtonClick()}
				disabled={characterAlreadySelected}
			>
				{buttonCharacter}
			</button>
		</div>
	);
};
export default CharacterButton;
