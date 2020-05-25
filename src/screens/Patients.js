import React, { Component } from 'react';
import i18n from "i18next";
import { Grid } from '@material-ui/core';

import Header from 'Containers/Header';
import PatientsList from 'Containers/PatientsList';
import { Search } from 'Components/Inputs';

class Patients extends Component {
	render() {
		return (
			<Grid
				container
				direction="column"
				className="outer-container"
			>
				<div className="primary-bg-light">
					<Header>
						<div className="header-container__search-container">
							<Search searchPlaceholder={i18n.t('search.placeholder.patients')} />
						</div>
					</Header>
					<div className="table-container">
						<PatientsList />
					</div>
				</div>
			</Grid>
		);
	}
}

export default Patients;
