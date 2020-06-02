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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import useStyles from './styles';

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    initialValues,
    update_transfer_errors
  } = props;
  const classes = useStyles();

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
            {
                update_transfer_errors && update_transfer_errors.non_field_errors &&
                <FormControl component="fieldset" error={true}>
                    <FormHelperText className={classes.error}>{update_transfer_errors.non_field_errors}</FormHelperText>
                </FormControl>
            }

        <Grid item sm={12} xs={12}>
            <Select
                options={statusChoices}
                defaultValue={statusChoices.find(choice => choice.value == initialValues.status)}
                name="status"
                onChange={(val) => setFieldValue('status', val.value)}
                error={update_transfer_errors && update_transfer_errors.status}
            />
            {
                update_transfer_errors && update_transfer_errors.status &&
                <FormControl component="fieldset" error={true}>
                    <FormHelperText className={classes.error}>{update_transfer_errors.status[0]}</FormHelperText>
                </FormControl>
            }
        </Grid>
        <Grid item sm={12} xs={12}>
            <TextField
                name="comments"
                label={i18n.t('Comments')}
                fullWidth
                defaultValue={initialValues.comments}
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
