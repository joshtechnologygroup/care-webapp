import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class Dashboard extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <h2>{t('Coming Soon...')}</h2>
      </div>
    );
  }
}

export default withTranslation()(Dashboard);
