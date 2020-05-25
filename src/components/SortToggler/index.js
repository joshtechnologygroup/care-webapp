import React from 'react'
import { ArrowUpward, ArrowDownward, Dehaze } from '@material-ui/icons';

export default function SortToggler({ onToggleSort }) {
  const toggleValues = ['none', 'asec', 'desc'];
  const [value, setValue] = React.useState(toggleValues[0]);

  const getIcon = () => {
    switch (value) {
      case toggleValues[0]: return <Dehaze fontSize="small" color="primary" />
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
    <div onClick={handleChange}>
      {getIcon()}
    </div>
  )
}
