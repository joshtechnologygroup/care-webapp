import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import { transferStatus } from "Constants/app.const";
import Select from 'react-select'

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    initialValues,
  } = props;

  const changeText = (name, e) => {
    setFieldTouched(e.target.name);
    setFieldValue(name, e.target.value);
  };

  const statusChoices = transferStatus.map(status => {
        return {
            'value': status.id,
            'label': status.name
        }
    })

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        <Grid item sm={12} xs={12}>
            <Select
                options={statusChoices}
                defaultValue={statusChoices.find(choice => choice.value == initialValues.status)}
                name="status"
                onChange={(val) => setFieldValue('status', val.value)}
            />
        </Grid>
        <Grid item sm={12} xs={12}>
            <TextField
                name="comments"
                label={i18n.t('Comments')}
                fullWidth
                onChange={changeText.bind(null, "comments")}
                variant="outlined"
            />
        </Grid>
        <Grid container justify="flex-end" className="mt-10" item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            size="medium"
            className="btn py-5 ml-10"
          >
            {i18n.t('Ok')}
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
