import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard.js';
import Homepage from './components/Homepage.js';

function App() {
	const [ bankOfWords, setBankOfWords ] = useState([]);

	return (
		<div className="App">
			<Homepage setBankOfWords={setBankOfWords} />
			<GameBoard bankOfWords={bankOfWords} />
			<h1>Word Game</h1>
		</div>
	);
}

export default App;
