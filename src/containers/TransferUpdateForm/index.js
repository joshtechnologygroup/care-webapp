import React, {useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomModal from 'Components/CustomModal';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from './form';
import { connect } from 'react-redux';
import { updateTransferStatus } from "Actions/TransferAction";
import { TRANSFER_STATUS_CHOICES } from "Constants/app.const";
import _ from 'underscore';


export const TransferUpdateForm = (props) => {
    const { open, onClose, rowData, updateStatus } = props;
    const { i18n } = useTranslation();
    const submit = (data) => {
        const response = updateStatus(rowData.id, data);
        if(response.status === 200) {
            onClose();
        } else {
            console.log(response);
        }
    };
    return (
        <CustomModal open={open} onClose={onClose} title={i18n.t('Add Patient Transfer') }>
             <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{status: parseInt(_.invert(TRANSFER_STATUS_CHOICES)[rowData.status]), comments: rowData.comments ? rowData.comments : ""}}
                        onSubmit={submit}>
                        {
                            props => <Form {...props} />
                        }
                    </Formik>
                </Grid>
            </Grid>
        </CustomModal>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        updateStatus: (patientTransferId, body) => {
            dispatch(updateTransferStatus(patientTransferId, body));
        },
    };
};

export default connect(null, mapDispatchToProps)(TransferUpdateForm);
