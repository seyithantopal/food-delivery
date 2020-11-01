import React from 'react';

/* eslint-disable */
const Alert = ({ message, isOpen, changeStatus, type }) => {
	setTimeout(() => {
		changeStatus();
	}, 3000);
	return (
		<>
			<div className={isOpen ? `alert-${type} active` : 'alert'}>
				<div className="alert__content">{message}</div>
			</div>
		</>
	);
};

export default Alert;
