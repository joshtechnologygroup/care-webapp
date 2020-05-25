import React, { Component } from 'react';
import i18n from "i18next";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>{i18n.t('Dashboard')}</h2>
      </div>
    );
  }
}

export default Dashboard;
