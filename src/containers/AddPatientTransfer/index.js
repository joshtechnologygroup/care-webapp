import React, {useState, useEffect, useRef } from 'react';
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


export const PatientTransferForm = (props) => {
    const { open, onClose, rowData, updateStatus, update_transfer_errors, showSuccessToast } = props;
    const { i18n } = useTranslation();
    const submit = (data) => {
        console.log(data);
        setIsSubmitted(true);
    };
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        if(isSubmitted && !update_transfer_errors) {
            alert('success')
            onClose();
        }
    }, [update_transfer_errors, isSubmitted])

    const validationSchema = Yup.object({
        from_facility: Yup.number("Please select From Facility").required('Please select From Facility'),
        to_facility: Yup.number("Pleae select To Facility").required('Please select To Facility'),
        patient: Yup.number("Please select a patient").required('Please select Patient'),
        status: Yup.number().required('Please select a status'),
        comments: Yup.string()
      });

    return (
        <CustomModal open={open} onClose={onClose} title={i18n.t('Add Patient Transfer') }>
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
                            props => <Form {...props} update_transfer_errors={update_transfer_errors}/>
                        }
                    </Formik>
                </Grid>
            </Grid>
        </CustomModal>
    );
}

const mapStateToProps = (state) => ({
    update_transfer_errors: state.transfers.update_transfer_errors,
    facilityList: state.shortFacilities,
});
  
export default connect(mapStateToProps, null)(PatientTransferForm);
