import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  Typography,
  CardHeader,
} from '@material-ui/core';
import Select from 'react-select';
import { PropTypes } from 'prop-types';
import useStyles from './styles';

export default function Form(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const {
    values: {
      phone,
      districtPreference,
      name
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    editMode,
  } = props;
  
  const change = (name, e) => {
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
  };
  
  const changeSelect = (name, e) => {
    // handleChange(e);
    // setFieldTouched(e.target.name, true, false);
    console.log('-----', name, e)
  };

  return (
  <form onSubmit={handleSubmit}>
    <Card className={classes.root} elevation={4}>
      <CardHeader className="pb-0"
        title={i18n.t('Profile Details')}
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label={i18n.t('Name')}
              fullWidth
              value={name}
              onChange={change.bind(null, 'name')}
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              type="number"
              label={i18n.t('Phone Number')}
              fullWidth
              value={phone}
              onChange={change.bind(null, 'phone')}
              helperText={touched.phone ? errors.phone : ""}
              error={touched.phone && Boolean(errors.phone)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
              <Typography variant="h6">{i18n.t("Select District")}</Typography>
              <Select
                options={districtPreference}
                placeholder={i18n.t("Select District")}
                isMulti
                defaultValue={[districtPreference[0]]}
                onChange={changeSelect.bind(null, "districtPreference")}
              />
          </Grid>
          {
            editMode &&
            <Grid item xs={12} sm={3} className="ml-auto">
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                className="btn py-5"
              >
                {i18n.t('Submit')}
              </Button>
            </Grid>
          }
        </Grid>
      </CardContent>
    </Card>
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
