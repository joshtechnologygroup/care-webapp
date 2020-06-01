import React from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    TextField,
    Button
} from '@material-ui/core';

export default function Form() {
    const { i18n } = useTranslation();
    
    const changeText = (name, e) => {
        console.log(name, e.target.value);
    };

    return (
        <form className="change-password-form">
            <Grid item container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <TextField
                        name="currentPassword"
                        label={i18n.t('Current Password')}
                        fullWidth
                        onChange={changeText.bind(null, "currentPassword")}
                        variant="outlined"
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField
                        name="newPassword"
                        label={i18n.t('New Password')}
                        fullWidth
                        onChange={changeText.bind(null, "newPassword")}
                        variant="outlined"
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField
                        name="confirmPassword"
                        label={i18n.t('Confirm Password')}
                        fullWidth
                        onChange={changeText.bind(null, "confirmPassword")}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={3} className="ml-auto">
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        disableElevation
                        className="btn py-5"
                    >
                        {i18n.t('Submit')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
