import React from 'react';

import './Header.scss';

const Header = ({ children }) => (
	<div className="header-container">
		{children}
	</div>
);

export default Header;
