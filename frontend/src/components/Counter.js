import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// import * as counterActions from '../actions/counterActions';

const Counter = (props) => {
	const { counter } = props;

	const handleIncrement = () => {
		props.actions.increment();
	};

	const handleDecrement = () => {
		props.actions.decrement();
	};
	return (
		<>
			<h3>Counter: {counter}</h3>
			<button type="button" onClick={handleIncrement}>
				+
			</button>
			<button type="button" onClick={handleDecrement}>
				-
			</button>
		</>
	);
};

Counter.propTypes = {
	actions: PropTypes.oneOfType([PropTypes.object]).isRequired,
	counter: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
	return {
		counter: state.counter,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// actions: bindActionCreators(counterActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
