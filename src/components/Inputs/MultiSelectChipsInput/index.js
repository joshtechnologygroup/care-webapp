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
    onChange,
  } = props;
  const [val, setVal] = useState(value);

  const change = (e) => {
    if (e.target.checked && !value.includes(e.target.name)) {
      setVal(value.push(e.target.name))
      onChange && onChange(new Array(...value));
    }
    if (!e.target.checked && value.includes(e.target.name)) {
      setVal(value.splice(value.indexOf(e.target.name), 1))
      onChange && onChange(new Array(...value));
    }
  };
  
  return (
      options.length && options.map((option, index) =>
        <Checkbox key={index}
          name={option.name}
          className={`mr-5 mt-5 p-0 ${classes.root}`}
          checked={value.indexOf(option.name) > -1}
          onChange={change}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          checkedIcon={
            <Chip className="selected" label={option.name} />
          }
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
  onChange: PropTypes.func
}

MultiSelectChipsInput.defaultProps = {
  options: [],
  value: []
}
