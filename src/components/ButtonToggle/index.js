import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import useStyles from './styles';

export default function ButtonToggle(props) {
  const classes = useStyles();
  const { data, label, onChange, defaultSelected, restrictUnselect } = props;
  const [alignment, setAlignment] = React.useState(defaultSelected);

  const handleChange = (event, newAlignment) => {
    if (!restrictUnselect || newAlignment) {
      setAlignment(newAlignment);
      onChange(newAlignment);
    }
  };

  return (
    <div>
      {
        Boolean(label) &&
        <div className={classes.label}>
          {label}
        </div>
      }
      <ToggleButtonGroup size="medium" value={alignment} exclusive onChange={handleChange}>
        {data && data.map((item, index) => {
          return (<ToggleButton key={index} value={item.value} className={classes.root}>
                      {item.title}
                  </ToggleButton>)
        })}
      </ToggleButtonGroup>
    </div>
  );
}
