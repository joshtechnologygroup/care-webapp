import React from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    TextField,
    Button
} from '@material-ui/core';

export default function Form(props) {
    const { handleSubmit, setFieldValue, errors } = props
    const { i18n } = useTranslation();
    
    const changeText = (name, e) => {
        setFieldValue(name, e.target.value);
    };

    return (
        <form className="change-password-form" onSubmit={handleSubmit}>
            <Grid item container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <TextField
                        name="current_password"
                        label={i18n.t('Current Password')}
                        fullWidth
                        onChange={changeText.bind(null, "current_password")}
                        variant="outlined"
                        type="password"
                        helperText={errors.current_password}
                        error={errors.current_password}
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField
                        name="password_1"
                        label={i18n.t('New Password')}
                        fullWidth
                        onChange={changeText.bind(null, "password_1")}
                        variant="outlined"
                        type="password"
                        helperText={errors.password_1}
                        error={errors.password_1}
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField
                        name="password_2"
                        label={i18n.t('Confirm Password')}
                        fullWidth
                        onChange={changeText.bind(null, "password_2")}
                        variant="outlined"
                        type="password"
                        helperText={errors.password_2}
                        error={errors.password_2}
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
