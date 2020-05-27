import React from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    TextField

} from '@material-ui/core';
import { PropTypes } from 'prop-types';

export default function Form(props) {
    const {
        details,
        handleChange
    } = props;
    const { name, phone, email } = details;
    const { i18n } = useTranslation();
    
    const changeText = (name, e) => {
        handleChange(name, e.target.value);
    };

    return (
        <form>
            <Grid item container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <TextField
                        name="name"
                        label={i18n.t('Incharge Name')}
                        fullWidth
                        defaultValue={name}
                        onChange={changeText.bind(null, "name")}
                        variant="outlined"
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField 
                        name="phone"
                        type="number"
                        defaultValue={phone}
                        label={i18n.t('Phone Number')}
                        fullWidth
                        onChange={changeText.bind(null, "phone")}
                        variant="outlined"
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField 
                        name="email"
                        type="email"
                        defaultValue={email}
                        label={i18n.t('Email')}
                        fullWidth
                        onChange={changeText.bind(null, "email")}
                        variant="outlined"
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