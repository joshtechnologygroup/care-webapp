import React, { useEffect } from 'react';
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
import { replaceIds } from "Src/utils/listFilter";
import _ from "underscore";

export default function Form(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const {
    values: {
      phone_number,
      name,
      preferred_districts
    },
    errors,
    touched,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    editMode,
    districtPreference,
    handleCancel,
  } = props;

  const change = (name, e) => {
    setFieldTouched(e.target.name);
    setFieldValue(name, e.target.value);
};
  
  const changeSelect = (name, val) => {
    setFieldValue(name, val.map(item => item.value));
  };

  React.useEffect(() => {
    changeSelect('preferred_districts_id', preferred_districts)
  }, [preferred_districts]);

  return (
  <form onSubmit={handleSubmit}>
    <Card className={classes.root} elevation={4}>
      <CardHeader
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
              name="phone_number"
              type="number"
              label={i18n.t('Phone Number')}
              fullWidth
              value={phone_number}
              onChange={change.bind(null, 'phone_number')}
              helperText={touched.phone ? errors.phone_number : ""}
              error={touched.phone && Boolean(errors.phone_number)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">{i18n.t("Select District")}</Typography>
            {
              districtPreference.length > 0 && preferred_districts.length > 0 &&
              <Select
                name="preferred_districts_id"
                options={districtPreference}
                placeholder={i18n.t("Select District")}
                isMulti
                defaultValue={districtPreference.filter((district) => preferred_districts.includes(district.value))}
                onChange={(val) => changeSelect('preferred_districts_id', val)}
              />
            }
          </Grid>
          {
            editMode &&
            <>
              <Grid item xs={12} className="text-right">
                <Button
                  variant="contained"
                  disableElevation
                  className="btn py-5"
                  onClick={handleCancel}
                >
                  {i18n.t('Cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  className="btn py-5 ml-10"
                >
                  {i18n.t('Submit')}
                </Button>
              </Grid>
            </>
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
