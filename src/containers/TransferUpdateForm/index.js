import React, {useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomModal from 'Components/CustomModal';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from './form';
import { connect } from 'react-redux';
import { updateTransferStatus, setTransferUpdateApiSuccess } from "Actions/TransferAction";
import { TRANSFER_STATUS_CHOICES } from "Constants/app.const";
import _ from 'underscore';


export const TransferUpdateForm = (props) => {
    const { open, onClose, rowData, updateStatus, update_transfer_errors, showSuccessToast, apiSuccess, setApiStatus } = props;
    const { i18n } = useTranslation();
    const submit = async (data) => {
        updateStatus(rowData.id, data);
    };

    useEffect(() => {
        if(apiSuccess) {
            showSuccessToast();
            handleClose();
        }
    }, [apiSuccess])

    const handleClose = () => {
        onClose();
        setApiStatus({
            apiSuccess: null,
            update_transfer_errors: {}
        });
    }

    return (
        <CustomModal open={open} onClose={handleClose} title={i18n.t('Update Patient Transfer Status') }>
             <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{status: parseInt(_.invert(TRANSFER_STATUS_CHOICES)[rowData.status]), comments: rowData.comments ? rowData.comments : ""}}
                        onSubmit={submit}>
                        {
                            props => <Form {...props} update_transfer_errors={update_transfer_errors}/>
                        }
                    </Formik>
                </Grid>
            </Grid>
        </CustomModal>
    );
}

const mapStateToProps = state => {
    return {
        apiSuccess: state.transfers.apiSuccess,
        update_transfer_errors: state.transfers.update_transfer_errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateStatus: (patientTransferId, body) => {
            dispatch(updateTransferStatus(patientTransferId, body));
        },
        setApiStatus: (data) => {
            dispatch(setTransferUpdateApiSuccess(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferUpdateForm);
