import React from 'react';
import './Homepage.css';
import tmdbApiKey from '../ApiKey.js';

const Homepage = ({ setBankOfWords }) => {
	const getCountryInfo = (type) => {
		fetch('https://restcountries.eu/rest/v2/all')
			.then((res) => res.json())
			.then((results) => {
				const countryNamesArray = [];
				results.forEach((result) => {
					countryNamesArray.push(result[type]);
				});
				console.log(results);
				setBankOfWords(countryNamesArray);
				return results;
			})
			.catch((err) => console.error(err));
	};

	const getTvShowNames = () => {
		const pageNumber = Math.floor(Math.random() * 500) + 1;
		fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + tmdbApiKey + '&language=en-US&page=' + pageNumber)
			.then((res) => res.json())
			.then((data) => {
				const tvShowNamesArray = [];
				data.results.forEach((result) => {
					if (
						result.original_language === 'en' &&
						(result.origin_country[0] === 'US' || result.origin_country[0] === 'GB')
					) {
						console.log('popularity', result.popularity);
						console.log('name', result.name);
						console.log('origin country', result.origin_country[0]);
						tvShowNamesArray.push(result.name);
					}
				});
				console.log(data);
				setBankOfWords(tvShowNamesArray);
				return data;
			})
			.catch((err) => console.error(err));
	};

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
				<button className="home-button" onClick={() => getTvShowNames()}>
					T.V.Shows
				</button>
			</div>
		</div>
	);
};
export default Homepage;
