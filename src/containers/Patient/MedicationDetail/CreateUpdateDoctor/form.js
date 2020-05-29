import React from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    TextField,
    InputAdornment,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Event } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';


export default function Form(props) {
    const {
        details,
        handleChange
    } = props;
    const { name, phone, email } = details;
    const { i18n } = useTranslation();
    
    const changeText = (name, e) => {
        handleChange(name, e.target.value);
    };

    return (
        <form>
          <Grid item container spacing={2}>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    margin="normal"
                    name="date"
                    format="MM/dd/yyyy"
                    value={details.date}
                    className="m-0"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment><Event /></InputAdornment>
                      ),
                    }}
                    fullWidth
                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label={i18n.t('Name of doctor/attendant')}
                  fullWidth
                  defaultValue={name}
                  onChange={changeText.bind(null, "name")}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  name="phone"
                  type="number"
                  defaultValue={phone}
                  label={i18n.t('Phone Number')}
                  fullWidth
                  onChange={changeText.bind(null, "phone")}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  name="email"
                  type="email"
                  defaultValue={email}
                  label={i18n.t('Email')}
                  fullWidth
                  onChange={changeText.bind(null, "email")}
                  variant="outlined"
                />
              </Grid>
          </Grid>
      </form>
    );
}

Form.propTypes = {
    profile: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
}

Form.defaultProps = {
    profile: {}
}