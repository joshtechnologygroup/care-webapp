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
  } = props;

  const [val, setVal] = useState(value);

  const change = (e) => {
    setVal(e.target.name);
    onChange && onChange(e.target.name);
  };

  return (
      options.length && options.map((option, index) =>
        <Checkbox key={index}
          name={option.name}
          className={`mr-5 mt-5 p-0 ${classes.root}`}
          checked={val === option.name}
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

SingleSelectChipsInput.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}

SingleSelectChipsInput.defaultProps = {
  options: [],
  value: ''
}
