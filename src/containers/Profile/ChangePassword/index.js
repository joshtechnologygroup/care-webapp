import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import Form from './form';
import './style.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

export default function ChangePassword(props) {
  const { i18n } = useTranslation();
  const submit = (data) => {
      props.handleSubmit(data);
  }
  const { apiSuccess } = props;

  const validationSchema = Yup.object().shape({
    current_password: Yup
      .string()
      .required("This field is required."),
    password_1: Yup
      .string()
      .required("This field is required."),
    password_2: Yup
      .string()
      .required("This field is required.")
      .test('passwords-match', 'New password and confirm password are not same', function(value) {
        return this.parent.password_1 === value;
      }),
  });

  const { changePasswordErrors } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = () => {
      setExpanded(!expanded);
  }

  React.useEffect(() =>{
    if(apiSuccess) {
        setExpanded(false);
    }
  }, [apiSuccess])

  return (
    <React.Fragment>
      <ExpansionPanel expanded={expanded} onChange={handleChange}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">{i18n.t('Change Password')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Formik
                initialValues={{
                    current_password: "",
                    password_1: "",
                    password_2: ""
                }}
                validationSchema={validationSchema}
                onSubmit={submit}
                >
                {
                    props => <Form {...props}/>
                }
            </Formik>
            {
            changePasswordErrors && changePasswordErrors && 
            <FormControl component="fieldset" error={true}>
                <FormHelperText>{changePasswordErrors.non_field_errors}</FormHelperText>
            </FormControl>
            }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
}
