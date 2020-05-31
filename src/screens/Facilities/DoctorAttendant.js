import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Header from 'Containers/Header';

class DoctorAttendant extends Component {
    render() {
        const { t } = this.props;
        return (
            <Header>
                <h2>{t('Doctor / Attendant')}</h2>
            </Header>
        );
    }
}

export default withTranslation()(DoctorAttendant);
