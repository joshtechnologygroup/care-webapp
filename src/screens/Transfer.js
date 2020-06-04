import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";

import Header from 'Containers/Header';
import TransfersList from 'Containers/TransfersList';
import PatientTransferForm from '../containers/AddPatientTransfer';
import { createToastNotification } from 'Actions/ToastAction';
import { connect } from 'react-redux';

const Transfer = (props) => {
    const [open, setOpen] = React.useState(false);
    const { addToastNotification } = props;

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const showSuccessToast = () => {
        addToastNotification({
            id: 1, 
            title: "Successfully Updated", 
            desc: "Status has been successfully updated.", 
            severity: 'success'
        })
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


const mapDispatchToProps = dispatch => {
    return {
        addToastNotification: (data) => { dispatch(createToastNotification(data)) }
    };
};

export default connect(null, mapDispatchToProps)(Transfer);
