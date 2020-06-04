import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {
  Grid,
  TextField
} from '@material-ui/core';
import {regex} from 'Constants/app.const';
import useStyles from './styles';
import {connect} from 'react-redux';
import Select from "react-select";

export function Form(props) {
  const classes = useStyles();
  const {i18n} = useTranslation();
  const {data, handleChange, updateOperation} = props;
  const [errors, setErrors] = useState({
    name: !updateOperation,
    phone_number: !updateOperation,
    email: !updateOperation,
    form: ''
  })

  const change = (name, value) => {
    handleChange(name, value.value);
  };

  const changeText = (name, e) => {
    switch (name) {
      case 'email':
        errors[name] = !(regex.email).test(e.target.value);
        break;
      case 'phone_number':
        errors[name] = !(regex.phone_number).test(e.target.value);
        break;
      default:
        errors[name] = !(e.target.value);
    }
    setErrors(prevState => ({
      ...prevState,
      ...errors
    }))
    handleChange(name, e.target.value);
  };

  return (
    <form>
      <Grid item container spacing={2}>
        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Facility Name')}</label>
          <Select
            options={props.facility}
            defaultValue={props.facility[0]}
            onChange={change.bind(null, "facility")}
            isDisabled={updateOperation}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Designation')}</label>
          <Select
            options={props.designation}
            defaultValue={props.designation[0]}
            onChange={change.bind(null, "designation")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            name="name"
            type="text"
            label={i18n.t('Name')}
            id={"standard-error-helper-text"}
            defaultValue={data && data.name}
            helperText={props.errorString.name.reduce((total, value, index, array) => total + ' ' + value)}
            fullWidth
            onChange={changeText.bind(null, "name")}
            error={errors.name}
            // error={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            name="phone_number"
            type="number"
            helperText={props.errorString.phone_number.reduce((total, value, index, array) => total + ' ' + value)}
            label={i18n.t('Phone Number')}
            defaultValue={data && data.phone_number}
            fullWidth
            onChange={changeText.bind(null, "phone_number")}
            error={errors.phone_number}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            name="email"
            type="email"
            label={i18n.t('Email')}
            helperText={props.errorString.email.reduce((total, value, index, array) => total + ' ' + value)}
            defaultValue={data && data.email}
            fullWidth
            onChange={changeText.bind(null, "email")}
            error={errors.email}
          />
        </Grid>
      </Grid>
    </form>
  );
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Form);
