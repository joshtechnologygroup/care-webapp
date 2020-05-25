import React from 'react';
import Grid from '@material-ui/core/Grid';

import BedsList from 'Containers/Facilities/BedsList';

export const Beds = () => {
    return (
        <Grid
            container
            direction="column"
            className="outer-container"
        >
            <div className="primary-bg-light">
                <div className="table-container">
                    <BedsList />
                </div>
            </div>
        </Grid>
    );
}

export default Beds;

