import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Header from 'Containers/Header';

class Hcc extends Component {
    render() {
        const { t } = this.props;
        return (
            <Header>
                <h2>{t('HCC')}</h2>
            </Header>
        );
    }
}

export default withTranslation()(Hcc);
