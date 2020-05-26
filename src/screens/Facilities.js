import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

import FacilitiesList from 'Containers/FacilitiesList';
import Header from 'Containers/Header';
import { Search } from 'Components/Inputs';

class Facilities extends Component {
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
              <Search searchPlaceholder={t('search.placeholder.facilities')} />
            </div>
          </Header>
          <div className="table-container">
            <FacilitiesList />
          </div>
        </div>
      </Grid>
    );
  }
}

export default withTranslation()(Facilities);
