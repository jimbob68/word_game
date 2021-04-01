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
		<button onClick={() => handleCharacterButtonClick()} disabled={characterAlreadySelected}>
			{buttonCharacter}
		</button>
	);
};
export default CharacterButton;
