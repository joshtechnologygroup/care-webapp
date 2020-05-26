import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';

import Header from 'Containers/Header';
import PatientsList from 'Containers/PatientsList';
import { Search } from 'Components/Inputs';

class Patients extends Component {
	render() {
		const { t } = this.props;
		return (
			<Grid
				container
				direction="column"
				className="outer-container"
			>
				<div className="primary-bg-light">
					<Header>
						<div className="header-container__search-container">
							<Search searchPlaceholder={t('search.placeholder.patients')} />
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

export default withTranslation()(Patients);
