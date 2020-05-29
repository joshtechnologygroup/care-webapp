import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CustomModal from 'Components/CustomModal';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from './form';
import useStyles from './styles';

export const CreateUpdateFamilyDetail = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({});
    const [isAddAnother, setIsAddAnother] = useState(false);
    const { open, onClose } = props;
      
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
        console.log('data', data)
    };

    return (
        <Formik
            initialValues={details}
            validationSchema={validationSchema}
        >
            {
                props => <Form submitData={submit} editMode={editMode} details={details} {...props} handleChange={handleChange} />
            }
        </Formik>
    );
}

export default CreateUpdateFamilyDetail;
