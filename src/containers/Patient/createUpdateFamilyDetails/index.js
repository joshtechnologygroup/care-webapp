import React, {useState} from 'react';
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
