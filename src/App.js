import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard.js';
import Homepage from './components/Homepage.js';
import tmdbApiKey from './ApiKey.js';

function App() {
	const [ bankOfWords, setBankOfWords ] = useState([]);
	const [ categoryChosen, setCategoryChosen ] = useState('');
	const [ allHints, setAllHints ] = useState([]);
	const [ countriesResults, setCountriesResults ] = useState([]);

	const getCountryInfo = (type) => {
		const countryHints = [];
		fetch('https://restcountries.com/v3.1/all')
			.then((res) => res.json())
			.then((results) => {
				const countryNamesArray = [];
				console.log("results:", results)
				results.forEach((result) => {
					
					if (type === 'capital') {
						
						// console.log("Country hints:", countryHints)
						if(result.capital){
							countryHints.push(result.name.common);
							countryNamesArray.push(result.capital[0])
						} else {
							console.log("result.name.common:", result.name.common)
						}
					} else {
						if (result.flag) {
						countryHints.push(result.flags.svg)
						countryNamesArray.push(result.name.common)

						} else {
							// countryHints.push('Island');
							console.log("result.name.common:", result.name.common)
						}
					}
				});
				setBankOfWords(countryNamesArray);
				console.log("country names:", countryNamesArray)
				setCountriesResults(results);
				return results;
			})
			.then(() => setAllHints(countryHints))
			.catch((err) => console.error(err));
		if (type === 'name') {
			setCategoryChosen('Country Names');
		} else {
			setCategoryChosen('Capital Cities');
		}
		// setAllHints(countryHints);
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

	const getMovieStars = () => {
		const pageNumber = Math.floor(Math.random() * 500) + 1;

		fetch(
			'https://api.themoviedb.org/3/person/popular?api_key=' + tmdbApiKey + '&language=en-US&page=' + pageNumber
		)
			.then((res) => res.json())
			.then((data) => {
				const movieStarNames = [];
				let movieStarHints = [];

				data.results.forEach((result) => {
					if (result['known_for'][0].title && result['known_for'][0]['original_language'] === 'en') {
						movieStarNames.push(result.name);
						movieStarHints.push(result['known_for'][0].title);
					}
				});
				setBankOfWords(movieStarNames);
				setAllHints(movieStarHints);
			})
			.catch((err) => console.error(err));

		setCategoryChosen('Movie Stars');
	};

	const getPokemon = () => {
		const pokemonNumber = Math.floor(Math.random() * 898) + 1;
		fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonNumber)
			.then((res) => res.json())
			.then((result) => {
				setBankOfWords([ result.name ]);
				// setAllHints([ result.sprites['front_default'] ]);
				setAllHints([ result.sprites.other['official-artwork']['front_default'] ]);
			})
			.catch((err) => console.error(err));
		setCategoryChosen('Pokemon');
	};

	const getFootballTeams = () => {
		let footballTeamNames = [];
		let footballHint = [];
		let footballLeagueCodes = [ 'en.1', 'en.2', 'de.1', 'es.1', 'fr.1', 'it.1', 'nl.1', 'pt.1' ];
		const randomIndex = Math.floor(Math.random() * footballLeagueCodes.length);
		fetch(
			'https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/' +
				footballLeagueCodes[randomIndex] +
				'.clubs.json'
		)
			.then((res) => res.json())
			.then((results) => {
				results.clubs.forEach((result) => {
					footballTeamNames.push(result.name);
					footballHint.push(result.country);
				});
				setBankOfWords(footballTeamNames);
				setAllHints(footballHint);
				setCategoryChosen('Football Teams');
			})
			.catch((err) => console.error(err));
	};

	const getSongs = () => {
		let songNames = [];
		let songHints = [];
		// fetch('https://rss.itunes.apple.com/api/v1/gb/apple-music/top-songs/all/20/non-explicit.json')
		fetch('https://itunes.apple.com/gb/rss/topsongs/limit=100/json')
			.then((res) => res.json())
			.then((data) => {
				data.feed.entry.forEach((song) => {
					songNames.push(song['im:name'].label);
					songHints.push(song['im:artist'].label);
				});
				setBankOfWords(songNames);
				setAllHints(songHints);
				setCategoryChosen('Songs');
			})
			.catch((err) => console.error(err));
	};

	const getDogBreeds = () => {
		let dogBreeds = [];
		fetch('https://dog.ceo/api/breeds/list/all')
			.then((res) => res.json())
			.then((results) => {
				for (const [ key, value ] of Object.entries(results.message)) {
					if (value.length > 0) {
						value.forEach((subBreed) => dogBreeds.push(subBreed + ' ' + key));
					} else {
						dogBreeds.push(key);
					}
				}
				const randomIndex = Math.floor(Math.random() * dogBreeds.length);
				let breedAsArray = dogBreeds[randomIndex].split(' ');
				let dogBreedForFetch = '';
				if (breedAsArray.length === 2) {
					dogBreedForFetch = breedAsArray[1] + '/' + breedAsArray[0];
				} else {
					dogBreedForFetch = breedAsArray;
				}
				fetch('https://dog.ceo/api/breed/' + dogBreedForFetch + '/images/random')
					.then((res) => res.json())
					.then((results) => setAllHints([ results.message ]));
				setBankOfWords([ dogBreeds[randomIndex] ]);
				setCategoryChosen('Dog Breeds');
			})
			.catch((err) => console.error(err));
	};

	const getStarWarsCharacters = () => {
		const starWarsCharacterNames = [];
		const starWarsHints = [];
		const pageNumber = Math.floor(Math.random() * 8) + 1;
		fetch('https://swapi.dev/api/people/?page=' + pageNumber)
			.then((res) => res.json())
			.then((data) => {
				data.results.forEach((character) => {
					starWarsCharacterNames.push(character.name);
					starWarsHints.push(character.homeworld);
				});
				console.log('names', starWarsCharacterNames);
				let planetURL = '';

				const randomIndex = Math.floor(Math.random() * starWarsCharacterNames.length);
				planetURL = starWarsHints[randomIndex];
				planetURL = [ planetURL.slice(0, 4), 's', planetURL.slice(4) ].join('');
				fetch(planetURL).then((res) => res.json()).then((results) => {
					let planetName = '';
					planetName = results.name;
					setAllHints([ planetName ]);
				});

				setBankOfWords([ starWarsCharacterNames[randomIndex] ]);
				// setAllHints( starWarsHints );
				setCategoryChosen('StarWars Characters');

				// console.log("page", pageNumber)
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className="App">
			<h1>Hangman</h1>
			{bankOfWords.length === 0 && (
				<Homepage
					getTvShowNames={getTvShowNames}
					getCountryInfo={getCountryInfo}
					getMovieStars={getMovieStars}
					getPokemon={getPokemon}
					getFootballTeams={getFootballTeams}
					getSongs={getSongs}
					getDogBreeds={getDogBreeds}
					getStarWarsCharacters={getStarWarsCharacters}
				/>
			)}
			{/* {bankOfWords.length > 0 &&
			allHints.length > 0 && (
				<GameBoard
					setBankOfWords={setBankOfWords}
					bankOfWords={bankOfWords}
					categoryChosen={categoryChosen}
					getTvShowNames={getTvShowNames}
					allHints={allHints}
					getMovieStars={getMovieStars}
					getPokemon={getPokemon}
					setAllHints={setAllHints}
					countriesResults={countriesResults}
				/>
			)} */}

			{bankOfWords.length > 0 &&
			allHints.length > 0 && (
				<GameBoard
					setBankOfWords={setBankOfWords}
					bankOfWords={bankOfWords}
					categoryChosen={categoryChosen}
					getTvShowNames={getTvShowNames}
					allHints={allHints}
					getMovieStars={getMovieStars}
					getPokemon={getPokemon}
					setAllHints={setAllHints}
					countriesResults={countriesResults}
					getFootballTeams={getFootballTeams}
					getDogBreeds={getDogBreeds}
					getStarWarsCharacters={getStarWarsCharacters}
				/>
			)}
		</div>
	);
}

export default App;
