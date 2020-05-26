import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Loader from 'Components/Loader'
import Snackbars from 'Components/Snackbars'

class Profile extends Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <h2>{t('Profile')}</h2>
                <Loader />
                <Snackbars open={true} severity="error" message="Error occured!" />
            </div>
        );
    }
}

export default withTranslation()(Profile);
