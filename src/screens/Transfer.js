import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';

import Header from 'Containers/Header';
import TransfersList from 'Containers/TransfersList';

class Transfer extends Component {
  render() {
    return (
      <Grid
        container
        direction="column"
        className="outer-container"
      >
        <div className="primary-bg-light">
          <Header>
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => { console.log('initiate') }}
              >
                initiate
                    </Button>
            </div>
          </Header>
          <div className="table-container">
            <TransfersList />
          </div>
        </div>
      </Grid>
    );
  }
}

export default Transfer;
