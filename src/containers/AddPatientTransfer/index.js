import React, {useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomModal from 'Components/CustomModal';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from './form';
import { connect } from 'react-redux';
import { setAddTransferApiSuccess, addPatientTransfer } from "Actions/TransferAction";


const PatientTransferForm = (props) => {
    const { open, onClose, showSuccessToast, apiSuccess, setApiStatus, addPatientTransfer, addTransferErrors } = props;
    const { i18n } = useTranslation();
    const submit = (data) => {
        addPatientTransfer(data);
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
            add_transfer_errors: {}
        });
    }

    const validationSchema = Yup.object({
        from_facility: Yup.number("Please select From Facility").required('Please select From Facility'),
        to_facility: Yup.number("Pleae select To Facility").required('Please select To Facility'),
        patient: Yup.number("Please select a patient").required('Please select Patient'),
        status: Yup.number().required('Please select a status').required('Please select a Status'),
        comments: Yup.string()
      });

    return (
        <CustomModal open={open} onClose={handleClose} title={i18n.t('Add Patient Transfer') }>
             <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            status: 1,
                            comments: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={submit}>
                        {
                            props => <Form {...props} addTransferErrors={addTransferErrors}/>
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
        addTransferErrors: state.transfers.add_transfer_errors,
        FacilityList: state.shortFacilities,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addPatientTransfer: (body) => {
            dispatch(addPatientTransfer(body));
        },
        setApiStatus: (data) => {
            dispatch(setAddTransferApiSuccess(data));
        }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(PatientTransferForm);
