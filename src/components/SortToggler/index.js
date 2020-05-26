import React from 'react'
import { ArrowUpward, ArrowDownward, Sort } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

export default function SortToggler({ onToggleSort }) {
  const toggleValues = ['none', 'asec', 'desc'];
  const [value, setValue] = React.useState(toggleValues[0]);

  const getIcon = () => {
    switch (value) {
      case toggleValues[0]: return <Sort fontSize="small" color="primary" />
      case toggleValues[1]: return <ArrowUpward fontSize="small" color="primary" />
      case toggleValues[2]: return <ArrowDownward fontSize="small" color="primary" />
      default: return;
    }
  }

  const handleChange = () => {
    let nextIndex = (toggleValues.indexOf(value) + 1) % 3;
    setValue(toggleValues[nextIndex]);
    onToggleSort(toggleValues[nextIndex]);
  }
  return (
    <IconButton aria-label="delete" onClick={handleChange}>
      {getIcon()}
    </IconButton>
  )
}
