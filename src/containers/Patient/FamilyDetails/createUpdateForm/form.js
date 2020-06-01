import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core';

import { SingleSelectChipsInput } from 'Components/Inputs';

// Importing mock data
import { GENDER_LIST_MAPPING } from 'Constants/app.const';
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    details: {
      name,
      relation,
      age_year,
      age_month,
      gender,
      phone_number,
    },
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    cancelCallback,
  } = props;

  const changeText = (name, e) => {
    setFieldTouched(e.target.name);
    setFieldValue(name, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        <Grid className="pb-0" item xs={12} sm={6}>
          <TextField
            name="name"
            label={i18n.t('Name')}
            fullWidth
            defaultValue={name}
            onChange={changeText.bind(null, "name")}
            className="field"
            variant="outlined"
            helperText={errors.name}
            error={Boolean(errors.name)}
          />
        </Grid>

        <Grid className="pb-0" item xs={12} sm={6}>
          <TextField 
            name="phone_number"
            defaultValue={phone_number}
            label={i18n.t('Phone number')}
            fullWidth
            onChange={changeText.bind(null, "phone_number")}
            className="field"
            variant="outlined"
            helperText={errors.phone_number}
            error={Boolean(errors.phone_number)}
          />
        </Grid>
        <Grid className="pb-0" item xs={12} sm={6}>
          <TextField 
            select
            name="relation"
            defaultValue={relation}
            label={i18n.t('Relation with patient')}
            fullWidth
            onChange={changeText.bind(null, "relation")}
            className="field"
            variant="outlined"
            helperText={errors.relation}
            error={Boolean(errors.relation)}
          >
            {
            relationshipChoices.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>))
            }
          </TextField>
        </Grid>

        <Grid className="pb-0" item xs={12} sm={3}>
          <TextField 
            name="age_year"
            defaultValue={age_year}
            label={i18n.t('Age (Years)')}
            fullWidth
            onChange={changeText.bind(null, "age_year")}
            className="field"
            variant="outlined"
            helperText={errors.age_year}
            error={Boolean(errors.age_year)}
          />
        </Grid>

        <Grid className="pb-0" item xs={12} sm={3}>
          <TextField 
            name="age_month"
            defaultValue={age_month}
            label={i18n.t('Age (Months)')}
            fullWidth
            onChange={changeText.bind(null, "age_month")}
            className="field"
            variant="outlined"
            helperText={errors.age_month}
            error={Boolean(errors.age_month)}
          />
        </Grid>

        <Grid className="pb-0 mb-10" item xs={12}>
          <Typography variant="h6">
            {i18n.t('Gender')}
          </Typography>
          <SingleSelectChipsInput
            value={gender}
            options={GENDER_LIST_MAPPING}
            onChange={(val) => setFieldValue('gender', val)}
            valueKey="id"
          />
          <h5 className="text--error">
            {errors.gender}
          </h5>
        </Grid>

        <Grid container justify="flex-end" className="mt-10" item xs={12}>
          <Button
            variant="contained"
            disableElevation
            size="medium"
            className="btn py-5"
            onClick={cancelCallback}
          >
            {i18n.t('Cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            size="medium"
            className="btn py-5 ml-10"
          >
            {i18n.t('Save')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

Form.propTypes = {
    details: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
}

Form.defaultProps = {
    details: {}
}
