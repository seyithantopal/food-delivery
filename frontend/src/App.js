import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './assets/images/logo512.png';
import Posts from './components/Posts';
import Counter from './components/Counter';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Food from './components/Food/Food';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';

function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/food/:id" component={Food} />
				<Route path="/cart" component={Cart} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
}

export default App;
