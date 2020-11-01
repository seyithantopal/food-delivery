import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.png';

const Header = (props) => {
	const [hamburger, setHamburger] = useState('hamburger');
	const [navLinks, setNavLinks] = useState('navbar-nav nav-links');

	const handleHamburger = () => {
		if (hamburger === 'hamburger') {
			setHamburger('hamburger toggle');
			setNavLinks('navbar-nav nav-links active');
		} else {
			setHamburger('hamburger');
			setNavLinks('navbar-nav nav-links');
		}
	};

	return (
		<>
			<header>
				<div className="logo">
					<Link to="/" className="link">
						<img src={logo} alt="logo" />
					</Link>
				</div>
				<nav className="navbar">
					<ul className={navLinks}>
						<li>
							<Link to="/" className="link">
								Home
							</Link>
						</li>
						<li>
							<Link to="/cart">Cart</Link>
						</li>
					</ul>
				</nav>
				<div className={hamburger} onClick={handleHamburger}>
					<div className="line" />
					<div className="line" />
					<div className="line" />
				</div>
			</header>
		</>
	);
};

export default Header;
