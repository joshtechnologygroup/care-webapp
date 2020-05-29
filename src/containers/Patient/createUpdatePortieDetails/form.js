import React from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    TextField,
    InputAdornment,
    MenuItem,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Event } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';

// Importing mock data
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';


export default function Form(props) {
    const {
        details,
        handleChange
    } = props;
    const { portieName, portieContact, status, patientContact, patientRelation, patientRelationContact, dateTime, comments } = details;
    const { i18n } = useTranslation();
    
    const changeText = (name, e) => {
        handleChange(name, e.target.value);
    };

    return (
        <form>
          <Grid item container spacing={2}>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    label="Date time"
                    inputVariant="outlined"
                    value={details.dateTime}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment><Event /></InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="portieName"
                  label={i18n.t('Portie Name')}
                  fullWidth
                  defaultValue={portieName}
                  onChange={changeText.bind(null, "portieName")}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  name="portieContact"
                  type="number"
                  defaultValue={portieContact}
                  label={i18n.t('Portie contact number')}
                  fullWidth
                  onChange={changeText.bind(null, "portieContact")}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  name="patientContact"
                  type="number"
                  defaultValue={patientContact}
                  label={i18n.t('Patient contact number')}
                  fullWidth
                  onChange={changeText.bind(null, "patientContact")}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  select
                  name="patientRelation"
                  defaultValue={patientRelation}
                  label={i18n.t('Patient relation')}
                  fullWidth
                  onChange={changeText.bind(null, "patientRelation")}
                  variant="outlined"
                >
                  {
                  relationshipChoices.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>))
                  }
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  name="patientContact"
                  type="number"
                  defaultValue={patientContact}
                  label={i18n.t('Patient contact number')}
                  fullWidth
                  onChange={changeText.bind(null, "patientContact")}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  multiline
                  name="comments"
                  defaultValue={comments}
                  label={i18n.t('Comments')}
                  fullWidth
                  onChange={changeText.bind(null, "comments")}
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