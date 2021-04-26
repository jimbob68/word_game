import React from 'react';
import './Homepage.css';

const Homepage = ({
	getCountryInfo,
	getTvShowNames,
	getMovieStars,
	getPokemon,
	getFootballTeams,
	getSongs,
	getDogBreeds,
	getStarWarsCharacters
}) => {
	return (
		<div className="home-container">
			<p className="home-intro-text">Choose a Category</p>
			<div className="home-button-container">
				<button className="home-button" onClick={() => getCountryInfo('name')}>
					Countries
				</button>
				<button className="home-button" onClick={() => getCountryInfo('capital')}>
					Capital Cities
				</button>
				<button className="home-button" onClick={() => getTvShowNames('tv')}>
					T.V.Shows
				</button>

				<button className="home-button" onClick={() => getTvShowNames('movie')}>
					Movies
				</button>

				<button className="home-button" onClick={() => getMovieStars()}>
					Movie Stars
				</button>

				<button className="home-button" onClick={() => getPokemon()}>
					Pokemon
				</button>

				<button className="home-button" onClick={() => getFootballTeams()}>
					Football Teams
				</button>

				<button className="home-button" onClick={() => getSongs()}>
					Songs
				</button>

				<button className="home-button" onClick={() => getDogBreeds()}>
					Dog Breeds
				</button>

				<button className="home-button" onClick={() => getStarWarsCharacters()}>
					StarWars Characters
				</button>
			</div>
		</div>
	);
};
export default Homepage;
