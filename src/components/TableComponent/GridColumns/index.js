import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './GridColumns.scss';

export function GridColumns(props) {
  const { columnDefs, open, onChange, onClose } = props;
  const handleChange = (e, data) => {
      setState({ ...state, [e.target.value]: data });
      onChange(e, data);
  }
  const [state, setState] = React.useState({});
    

    useEffect(() => {
        const temp = {};
        columnDefs && columnDefs.forEach(item => {
            temp[item.field] = item.hide === undefined ? true : !item.hide;
        })
        setState(temp);
    }, [columnDefs]);
  return (
    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        className={`grid-column-panel ${open && 'active'}`}
    >
        <FormControl component="fieldset">
            <FormLabel component="legend" className="FormLabel_label">Choose Columns</FormLabel>
            <FormGroup>
                {
                    columnDefs && columnDefs.map(item => {
                    return (<FormControlLabel
                                key={item.field} control={<Checkbox checked={state[item.field] === undefined ? true : state[item.field]} onChange={handleChange} value={item.field} name={item.field} color="primary" />}
                                label={item.headerName}
                            />)
                    })
                }
            </FormGroup>
        </FormControl>
        <IconButton className="IconButton_close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
    </Grid>
  );
}

export default GridColumns;
