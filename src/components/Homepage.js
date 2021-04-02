import React from 'react';
import './Homepage.css';
import tmdbApiKey from '../ApiKey.js';

const Homepage = ({ setBankOfWords }) => {
	const getCountryNames = (type) => {
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
		fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + tmdbApiKey + '&language=en-US&page=1')
			.then((res) => res.json())
			.then((data) => {
				const tvShowNamesArray = [];
				data.results.forEach((result) => {
					tvShowNamesArray.push(result.name);
				});
				console.log(data);
				setBankOfWords(tvShowNamesArray);
				return data;
			})
			.catch((err) => console.error(err));
	};

	return (
		<div>
			<p>Categories</p>
			<button onClick={() => getCountryNames('name')}>Countries</button>
			<button onClick={() => getCountryNames('capital')}>Capitals</button>
			<button onClick={() => getTvShowNames()}>T.V.Shows</button>
		</div>
	);
};
export default Homepage;
