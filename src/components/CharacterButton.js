import React from 'react';
import './CharacterButton.css';
const CharacterButton = ({ buttonCharacter, guessedCharacters, setGuessedCharacters }) => {
	const handleCharacterButtonClick = () => {
		setGuessedCharacters((guessedCharacters) => [ ...guessedCharacters, buttonCharacter ]);
	};
	return <button onClick={() => handleCharacterButtonClick()}>{buttonCharacter}</button>;
};
export default CharacterButton;
