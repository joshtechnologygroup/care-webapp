import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CustomModal from 'Components/CustomModal';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from './form';
import useStyles from './styles';

export const CreateUpdateDoctor = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({});
    const [isAddAnother, setIsAddAnother] = useState(false);
    const { open, onClose } = props;
   
    const addAnother = (event) => {
        console.log('addAnother--', event);
        setIsAddAnother(event.target.checked)
    }
   
    const createIncharge = () => {
        console.log('createIncharge--', state);
        if(!isAddAnother) {
            onClose();
        }
    }
   
    const handleChange = (name, e) => {
        console.log('handleChange--', name, e);
        if(typeof name === 'object') {
            setState(name);
        } else {
            setState({...state, [name]: e});
        }
    }

    const { i18n } = useTranslation();
    const { details, editMode } = props;
    const validationSchema = Yup.object({
        name: Yup.string("Please enter incharge name").required('Please enter doctor/attendant name'),
        phone: Yup.number("Please enter contact number").required('Please enter contact number'),
        email: Yup.string("Please enter email address").required('Please enter email address')
    });
    const submit = (data) => {
        props.handleSubmit(data);
    };

    return (
        <CustomModal open={open} onClose={onClose} title={editMode ? i18n.t('Edit Doctor/Attendant') : i18n.t('Add Doctor/Attendant') }>
             <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Formik
                        initialValues={details}
                        validationSchema={validationSchema}
                        onSubmit={submit}>
                        {
                            props => <Form editMode={editMode} details={details} {...props} handleChange={handleChange} />
                        }
                    </Formik>
                </Grid>
                {/**
                 * For api errors 
                 */}
                {/* <Grid item xs={12}>
                    <FormControl component="fieldset" error={true}>
                        <FormHelperText className={classes.error}>Some sample error</FormHelperText>
                    </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                     {!editMode && <FormControlLabel
                        value="end"
                        control={<Switch checked={isAddAnother} onChange={addAnother} color="primary" />}
                        label="Add Another"
                        labelPlacement="end"
                    />}
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={createIncharge}
                    >
                        {i18n.t('Ok')}
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
}

export default CreateUpdateDoctor;
