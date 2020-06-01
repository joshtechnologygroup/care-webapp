import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Header from 'Containers/Header';
import Grid from "@material-ui/core/Grid";
import DoctorAttendantList from 'Containers/Facilities/DoctorAttendantList';

class DoctorAttendant extends Component {
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
                    <h2>{t('Doctor / Attendant')}</h2>
                </Header>
                <div className="table-container">
                    <DoctorAttendantList />
                </div>
            </div>
        </Grid>
    );
    }
}

export default withTranslation()(DoctorAttendant);
