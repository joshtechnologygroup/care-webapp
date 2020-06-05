import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  Chip,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';

const useStyles = makeStyles(theme =>
  ({
    root: {
      borderRadius: 0,
      '& .MuiIconButton-label': {
        borderRadius: '0',
      }
    },
  })
);

export default function MultiSelectChipsInput(props) {
  const classes = useStyles();
  const {
    options,
    value,
    valueKey,
    onChange,
    name,
  } = props;

  const change = (e, option) => {
    let selectedVal = valueKey ? option[valueKey] : option.name;
    if (e.target.checked && !value.includes(selectedVal)) {
      value.push(selectedVal);
      onChange && onChange([...value]);
    }
    if (!e.target.checked && value.includes(selectedVal)) {
      value.splice(value.indexOf(selectedVal), 1);
      onChange && onChange([...value]);
    }
  };
  
  return (
      options.length && options.map((option, index) =>
        <Checkbox key={index}
          name={`${option.name}__${name}`}
          className={`mr-5 mt-5 p-0 ${classes.root}`}
          checked={value.indexOf(valueKey ? option[valueKey] : option.name) > -1}
          onChange={(e) => change(e, option)}
          inputProps={{ 'aria-label': option.name }}
          checkedIcon={
            <Chip className="selected" label={option.name} />
          }
          color="default"
          icon={
            <Chip label={option.name} />
          }
        />
      )
  );
}

MultiSelectChipsInput.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
}

MultiSelectChipsInput.defaultProps = {
  options: [],
  value: [],
  valueKey: '',
}
