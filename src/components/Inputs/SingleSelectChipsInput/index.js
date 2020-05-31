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

export default function SingleSelectChipsInput(props) {
  const classes = useStyles();
  const {
    options,
    value,
    onChange,
    valueKey
  } = props;

  const [val, setVal] = useState(value);

  const change = (e, option) => {
    if (typeof option[valueKey] === 'boolean') {
      setVal(e.target.value === 'true' ? true : false);
      onChange && onChange(e.target.value === 'true' ? true : false);
    } else {
      setVal(e.target.value);
      onChange && onChange(e.target.value);
    }
  };
  return (
    options.length && options.map((option, index) =>
      <Checkbox key={index}
        name={option.name}
        className={`mr-5 mt-5 p-0 ${classes.root}`}
        checked={val === (valueKey ? option[valueKey] : option.name)}
        value={valueKey ? option[valueKey] : option.name}
        onChange={(e) => change(e, option)}
        color="default"
        checkedIcon={
          <Chip className={option.theme ? option.theme : 'selected'} label={option.name} />
        }
        icon={
          <Chip label={option.name} />
        }
      />
    )
  );
}

SingleSelectChipsInput.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func,
  valueKey: PropTypes.string,
}

SingleSelectChipsInput.defaultProps = {
  options: [],
  value: '',
  valueKey: '',
}
