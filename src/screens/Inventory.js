import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Header from 'Containers/Header';
import { useTranslation } from "react-i18next";

import InventoryList from 'Containers/InventoryList';
import InventoryForm from 'Containers/InventoryForm';
import {ListAlt} from '@material-ui/icons';

export const Inventory = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const { i18n } = useTranslation();

    return (
        <Grid
            container
            direction="column"
            className="outer-container"
        >
            <div className="primary-bg-light">
                <Header>
                    <div className="ml-auto">
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={handleClick}
                            startIcon={<ListAlt />}
                        >
                            {i18n.t('ADD NEW INVENTORY')}
                    </Button>
                    </div>
                </Header>
                <div className="table-container">
                    <InventoryList />
                </div>
                <InventoryForm open={open} onClose={handleClose} />
            </div>
        </Grid>
    );
}

export default Inventory;
