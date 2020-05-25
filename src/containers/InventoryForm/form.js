import React, {useEffect} from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    TextField

} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import Select from 'react-select'
import useStyles from './styles';

export default function Form(props) {
    const classes = useStyles();
    const { i18n } = useTranslation();
    const {data, handleChange} = props;
    const facilityName = [
        { value: 'facility-1', label: 'Facility One' },
        { value: 'facility-2', label: 'Facility Two' },
        { value: 'facility-3', label: 'Facility Three' }
    ];

    const facilityType = [
        { value: 'facility-type-1', label: 'Facility Type One' },
        { value: 'facility-type-2', label: 'Facility Type Two' },
        { value: 'facility-type-3', label: 'Facility Type Three' }
    ];

    const change = (name, e) => {
        handleChange(name, e);
    };
     const changeText = (name, e) => {
        handleChange(name, e.target.value);
    };

    useEffect(() => {
        console.log('data in edit mode', data);
        handleChange({"name": facilityName[0], "type": facilityType[0]}); // Setting initial state
    }, []);
    return (
        <form>
            <Grid item container spacing={2}>
                <Grid item sm={6} xs={12}>
                    <label className={classes.label}>{i18n.t('Facility Name')}</label>
                    <Select
                        options={facilityName}
                        defaultValue={facilityName[0]}
                        onChange={change.bind(null, "name")}
                    />
                </Grid>

                <Grid item sm={6} xs={12}>
                    <label className={classes.label}>{i18n.t('Facility Type')}</label>
                    <Select
                        options={facilityType}
                        defaultValue={facilityType[0]}
                        onChange={change.bind(null, "type")}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField 
                        name="requiredNo"
                        type="number"
                        label={i18n.t('Required Number')}
                        fullWidth
                        onChange={changeText.bind(null, "requiredNo")}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField 
                        name="currentNo"
                        type="number"
                        label={i18n.t('Current Number')}
                        fullWidth
                        onChange={changeText.bind(null, "currentNo")}
                    />
                </Grid>
            </Grid>
        </form>
    );
}

Form.propTypes = {
    profile: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
}

Form.defaultProps = {
    profile: {}
}