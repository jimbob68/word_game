import React from 'react';
import './Homepage.css';

const Homepage = ({ getCountryInfo, getTvShowNames }) => {
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
