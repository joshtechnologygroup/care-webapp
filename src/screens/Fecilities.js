import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import FacilitiesList from '../containers/FacilitiesList';
import Header from '../containers/Header';

class Fecilities extends Component {
    render() {
        return (
            <Grid
                container
                direction="column"
                className="outer-container"
            >
                <div className="primary-bg-light">
                    <Header searchPlaceholder='Search' />
                    <div className="table-container">
                        <FacilitiesList />
                    </div>
                </div>
            </Grid>
        );
    }
}

export default Fecilities;
