import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    TextField

} from '@material-ui/core';
import useStyles from './styles';
import { connect } from 'react-redux';

export function Form(props) {
    const classes = useStyles();
    const { i18n } = useTranslation();
    const { data, handleChange } = props;
    const [errors, setErrors] = useState({ total_bed: false, occupied_bed: false, available_bed: false , form: ''})

    const change = (name, value) => {
        handleChange(name, value);
    };
     const changeText = (name, e) => {
        switch (name) {
            case 'total_beds':
              errors.total_bed = e.target.value && ( parseInt(e.target.value) >= 0) ? false : true;
              break;
            case 'occupied_beds':
              errors.occupied_bed = e.target.value && (parseInt(e.target.value) >= 0) ? false : true;
              break;
            case 'available_bed':
              errors.available_bed = e.target.value && (parseInt(e.target.value) >= 0) ? false : true;
              break;
            default: break;
          }
          setErrors(prevState =>({
              ...prevState,
             ...errors
          }))
        handleChange(name, e.target.value);
    };


    return (
        <form>
            <Grid item container spacing={2}>
                <Grid item sm={6} xs={12}>
                    <TextField 
                        name="total_beds"
                        type="number"
                        label={i18n.t('Total Beds - ' +  data.total_bed.toString())}
                        fullWidth
                        onChange={changeText.bind(null, "total_beds")}
                        error={errors.total_bed}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="occupied_beds"
                    type="number"
                    label={i18n.t('Occupied Beds - ' + data.occupied_bed.toString())}
                    fullWidth
                    onChange={changeText.bind(null, "occupied_beds")}
                    error={errors.occupied_bed}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField 
                        name="available_bed"
                        type="number"
                        label={i18n.t('Available Beds - ' + data.available_bed.toString())}
                        fullWidth
                        onChange={changeText.bind(null, "available_bed")}
                        error={errors.available_bed}
                    />
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = (state) => ({});
  
export default connect(mapStateToProps, null)(Form);
