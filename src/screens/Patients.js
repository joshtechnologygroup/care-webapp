import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Header from 'Containers/Header';
import PatientsList from 'Containers/PatientsList';
import { Search } from 'Components/Inputs';
import Button from "@material-ui/core/Button";
import { ListAlt } from "@material-ui/icons";


class Patients extends Component {

	handleClick = () => {
		this.props.history.push('/patients/add')
	}

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
						<div className="ml-auto">
							<Button
								variant="contained"
								color="primary"
								size="medium"
								onClick={() => this.handleClick()}
								startIcon={<ListAlt />}
							>
								{t('ADD NEW PATIENT')}
							</Button>
						</div>
					</Header>
					<div className="main-container">
						<PatientsList />
					</div>
				</div>
			</Grid>
		);
	}
}

export default withTranslation()(Patients);
