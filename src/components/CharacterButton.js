import React, { useState } from 'react';
import './CharacterButton.css';
const CharacterButton = ({ buttonCharacter, guessedCharacters, setGuessedCharacters }) => {
	const [ characterAlreadySelected, setCharacterAlreadySelected ] = useState(false);
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
