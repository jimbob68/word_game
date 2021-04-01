import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard.js';

function App() {
	const [ countryNames, setCountryNames ] = useState([]);

	useEffect(() => {
		fetch('https://restcountries.eu/rest/v2/all')
			.then((res) => res.json())
			.then((results) => {
				const countryNamesArray = [];
				results.forEach((result) => {
					if (!result.name.includes('(')) {
						countryNamesArray.push(result.name);
					}
				});
				console.log(results);
				setCountryNames(countryNamesArray);
				return results;
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<div className="App">
			<GameBoard bankOfWords={countryNames} />
			<h1>Word Game</h1>
		</div>
	);
}

export default App;
