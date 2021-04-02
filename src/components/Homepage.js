import React from 'react';
import './Homepage.css';
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

	return (
		<div>
			<p>Categories</p>
			<button onClick={() => getCountryNames('name')}>Countries</button>
			<button onClick={() => getCountryNames('capital')}>Capitals</button>
		</div>
	);
};
export default Homepage;
