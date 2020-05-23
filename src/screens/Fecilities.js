import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import FacilitiesList from 'Containers/FacilitiesList';
import Header from 'Containers/Header';

class Facilities extends Component {
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

export default Facilities;
