import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Header from 'Containers/Header';

class PrivateQuarantine extends Component {
    render() {
        const { t } = this.props;
        return (
            <Header>
                <h2>{t('Private Quarantine')}</h2>
            </Header>
        );
    }
}

export default withTranslation()(PrivateQuarantine);
