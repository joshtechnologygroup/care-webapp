import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class Settings extends Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <h2>{t('Settings')}</h2>
            </div>
        );
    }
}

export default withTranslation()(Settings);
