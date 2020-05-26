import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CustomModal from 'Components/CustomModal';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import Form from './form';
import useStyles from './styles';

export const InventoryForm = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({});
    const [isAddAnother, setIsAddAnother] = useState(false);
    const { open, data, onClose } = props;
   
    const addAnother = (event) => {
        console.log('addAnother--', event);
        setIsAddAnother(event.target.checked)
    }
   
    const createInventory = () => {
        console.log('createInventory--', state);
        if(!isAddAnother) {
            onClose();
        }
    }
   
    const handleChange = (name, e) => {
        console.log('handleChange--', name, e);
        if(typeof name === 'object') {
            setState(name);
        } else {
            setState({...state, [name]: e});
        }
    }

    const { i18n } = useTranslation();

    return (
        <CustomModal open={open} onClose={onClose} title={i18n.t('Inventory')}>
             <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Formik>
                        {
                            props => <Form data={data} {...props} handleChange={handleChange} />
                        }
                    </Formik>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" error={true}>
                        <FormHelperText className={classes.error}>This Enventory already exists!</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                     <FormControlLabel
                        value="end"
                        control={<Switch checked={isAddAnother} onChange={addAnother} color="primary" />}
                        label="Add Another"
                        labelPlacement="end"
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={createInventory}
                    >
                        {i18n.t('Ok')}
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
}

export default InventoryForm;
