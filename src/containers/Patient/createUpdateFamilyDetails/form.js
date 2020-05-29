import React from 'react';
import { useTranslation } from "react-i18next";
import {
    TextField,
    TableRow,
    TableCell,
    MenuItem,
    Button,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import useStyles from './styles';
// Importing mock data
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';
import { genderChoices } from 'Constants/app.const';

export default function Form(props) {
    const classes = useStyles();
    const {
        details,
        submitData,
        setFieldValue,
    } = props;

    // const { name, phone, gender, ageMonths, ageYears } = details;
    const { i18n } = useTranslation();
    
    const changeValue = (e) => {
      setFieldValue(e.target.name, e.target.value);
    };

    const submitChange = () => {
      submitData(details);
      console.log('form submitted', details)
    };

    return (
    <TableRow className={classes.placeholderRow}>
      <TableCell>
        <TextField
          name="name"
          variant="outlined"
          placeholder="Member name"
          onChange={changeValue}
          value={details.name}
          fullWidth
        />
      </TableCell>
      <TableCell>
        <TextField
          select
          name="relation"
          variant="outlined"
          placeholder="Relationship"
          value={details.relation}
          onChange={changeValue}
          fullWidth
        >
          {
            relationshipChoices.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>))
          }
        </TextField>
      </TableCell>
      <TableCell>
        <TextField
          select
          name="gender"
          variant="outlined"
          placeholder="Gender"
          value={details.gender}
          onChange={changeValue}
          fullWidth
        >
          {
            genderChoices.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>))
          }
        </TextField>
      </TableCell>
      <TableCell className={classes.smallCell}>
        <TextField
          name="ageYears"
          variant="outlined"
          value={details.ageYears}
          onChange={changeValue}
          placeholder="Years"
          className="mr-4"
        />
        <TextField
          name="ageMonths"
          variant="outlined"
          value={details.ageMonths}
          onChange={changeValue}
          placeholder="Months"
          className={classes.smallInput}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="phone"
          variant="outlined"
          value={details.phone}
          onChange={changeValue}
          placeholder="Phone"
          fullWidth
        />
      </TableCell>
      <TableCell>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          className="btn"
          onClick={submitChange}
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
}

Form.propTypes = {
    details: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
}

Form.defaultProps = {
    details: {}
}
