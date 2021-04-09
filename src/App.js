import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard.js';
import Homepage from './components/Homepage.js';
import tmdbApiKey from './ApiKey.js';

function App() {
	const [ bankOfWords, setBankOfWords ] = useState([]);
	const [ categoryChosen, setCategoryChosen ] = useState('');
	const [ allHints, setAllHints ] = useState([]);

	const getCountryInfo = (type) => {
		const countryHints = [];
		fetch('https://restcountries.eu/rest/v2/all')
			.then((res) => res.json())
			.then((results) => {
				const countryNamesArray = [];
				results.forEach((result) => {
					countryNamesArray.push(result[type]);
					if (type === 'capital') {
						countryHints.push(result.name);
					} else {
						countryHints.push(result.region);
					}
				});
				setBankOfWords(countryNamesArray);
				return results;
			})
			.catch((err) => console.error(err));
		if (type === 'name') {
			setCategoryChosen('Country Names');
		} else {
			setCategoryChosen('Capital Names');
		}
		setAllHints(countryHints);
	};

	const getTvShowNames = (type) => {
		let genres = [];
		fetch('https://api.themoviedb.org/3/genre/' + type + '/list?api_key=' + tmdbApiKey + '&language=en-US') // fetching all possible genres and ids
			.then((res) => res.json())
			.then((data) => {
				genres = data.genres; // setting all genres array
			});
		const pageNumber = Math.floor(Math.random() * 500) + 1;
		fetch(
			'https://api.themoviedb.org/3/' +
				type +
				'/popular?api_key=' +
				tmdbApiKey +
				'&language=en-US&page=' +
				pageNumber
		)
			.then((res) => res.json())
			.then((data) => {
				const tvShowNamesArray = [];
				const genresForAllResults = []; // genres for each result, will be array of arrays
				data.results.forEach((result) => {
					if (
						result.original_language === 'en' &&
						(type === 'movie' ||
							((type === 'tv' && result.origin_country[0] === 'US') ||
								(type === 'tv' && result.origin_country[0] === 'GB'))) //filtering results for US and UK shows
					) {
						if (type === 'tv') {
							tvShowNamesArray.push(result.name);
						} else {
							tvShowNamesArray.push(result.title);
						}
						result.genre_names = []; // adding genre_names property to each TV show
						result.genre_ids.forEach((genre_id) => {
							// looping over all genre_ids for each TV show
							genres.forEach((genre) => {
								// looping over all possible genres
								if (genre.id === genre_id) {
									// checking if this show's genre_id matches, if yes push genre_name
									result.genre_names.push(genre.name);
								}
							});
						});
						genresForAllResults.push(result.genre_names);
					}
				});
				setAllHints(genresForAllResults);
				setBankOfWords(tvShowNamesArray);
				return data;
			})
			.catch((err) => console.error(err));
		if (type === 'tv') {
			setCategoryChosen('TV Shows');
		} else {
			setCategoryChosen('Movies');
		}
	};

	return (
		<div className="App">
			<h1>Word Game</h1>
			{bankOfWords.length === 0 && <Homepage getTvShowNames={getTvShowNames} getCountryInfo={getCountryInfo} />}
			{bankOfWords.length > 0 && (
				<GameBoard
					setBankOfWords={setBankOfWords}
					bankOfWords={bankOfWords}
					categoryChosen={categoryChosen}
					getTvShowNames={getTvShowNames}
					allHints={allHints}
				/>
			)}
		</div>
	);
}

export default App;
