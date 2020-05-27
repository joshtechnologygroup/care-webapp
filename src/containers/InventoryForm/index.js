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
import { createOrUpdateInventory } from 'Actions/FacilitiesAction';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

export const InventoryForm = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({});
    const [isAddAnother, setIsAddAnother] = useState(false);
    const { open, data, onClose } = props;
   
    const addAnother = (event) => {
        setIsAddAnother(event.target.checked)
    }
   
    const createInventory = () => {
        let initial = state
        const facility = props.facilityList.find(      
            facility => facility.name === state.name.label
        )
        if(facility){
            initial['facility'] = facility.id
            delete initial.name;
        }
        const inventory = props.inventoryTypesList.find(      
            inventory => inventory.name === state.type.label
        )
        if(inventory){
            initial['item'] = inventory.id
            delete initial.type;
        }
        setState({state:initial});
        if(isAddAnother === false){
            props.createOrUpdateInventory(state, data.id)
        } else {
            props.createOrUpdateInventory(state)
        }
        if(!isAddAnother) {
            onClose();
        }
    }
   
    const handleChange = (name, e) => {
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
                        <FormHelperText className={classes.error}>This Inventory already exists!</FormHelperText>
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


const mapStateToProps = (state) => ({
    inventoryList:state.inventory.results,
    inventoryTypesList: state.inventoryTypes.results,
    facilityList: state.facilities.results,
    count:state.inventory.count
  });
  
  InventoryForm.propTypes = {
    inventoryList: PropTypes.array.isRequired,
    inventoryTypesList: PropTypes.array.isRequired,
    facilityList: PropTypes.array.isRequired,
    createOrUpdateInventory: PropTypes.func.isRequired,
};
  
  export default connect(mapStateToProps, {createOrUpdateInventory })(InventoryForm);
