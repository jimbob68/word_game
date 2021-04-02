import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard.js';
import Homepage from './components/Homepage.js';

function App() {
	const [ bankOfWords, setBankOfWords ] = useState([]);

	return (
		<div className="App">
			<h1>Word Game</h1>
			{bankOfWords.length === 0 && <Homepage setBankOfWords={setBankOfWords} />}
			{bankOfWords.length > 0 && <GameBoard setBankOfWords={setBankOfWords} bankOfWords={bankOfWords} />}
		</div>
	);
}

export default App;
