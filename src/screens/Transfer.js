import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";

import Header from 'Containers/Header';
import TransfersList from 'Containers/TransfersList';
import PatientTransferForm from '../containers/AddPatientTransfer';

const Transfer = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const showSuccessToast = () => {
        alert('Successfully Updated');
    };

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
              >
                  {i18n.t('INITIATE')}
                </Button>
            </div>
          </Header>
          <div className="main-container">
            <TransfersList />
          </div>
          <PatientTransferForm open={open} onClose={handleClose} showSuccessToast={showSuccessToast} />
        </div>
      </Grid>
    );
}

export default Transfer;
