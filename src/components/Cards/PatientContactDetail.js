import React, { Component } from 'react';
import { useTranslation } from "react-i18next";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { EditOutlined, PhoneOutlined, RoomOutlined, HomeOutlined } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { PropTypes } from 'prop-types';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            borderRadius: '0',
            boxShadow: '0.2rem 0.2rem 0.3rem 0.2rem rgba(0, 0, 0, 0.07)',
            position: 'relative',
            marginBottom: '16px'
        },
        action: {
            position: 'absolute',
            right: 0,
            top: 0
        },
        icon: {
            fontSize: '2.2rem',
            marginRight: '4px',
            alignSelf: 'flex-start'
        }
    })
);

export default function PatientContactDetail(props) {
    const classes = useStyles();
    const { i18n } = useTranslation();

    const { profile, handleEdit } = props;
    return (
        <Card className={classes.root} elevation={4}>
            <CardHeader
                className="pb-0"
                title={i18n.t('Contact Details')}
                action={
                    <IconButton variant="contained" className={classes.action} aria-label="settings" onClick={handleEdit}>
                        <EditOutlined fontSize="large"/>
                    </IconButton>
                }
            />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item md={3}>
                        <Typography variant="h6" color="primary" className="d-flex">
                            <PhoneOutlined className={classes.icon} />
                            {i18n.t('Phone number')}
                        </Typography>
                        <Typography variant="h6">
                            {profile.number} ({profile.numberBelongsTo})
                        </Typography>
                    </Grid>
                    <Grid item md={(profile.nativeState || profile.nativeCountry) ? 6 : 9}>
                        <Typography variant="h6" color="primary" className="d-flex">
                            <RoomOutlined className={classes.icon} />
                            {i18n.t('Address')}
                        </Typography>
                        <Typography variant="h6">
                            {profile.address}, {profile.municipalWard}
                        </Typography>
                        <Typography variant="h6">
                            {profile.district}, {profile.city}
                        </Typography>
                        <Typography variant="h6">
                            {profile.state}-{profile.pincode}
                        </Typography>
                    </Grid>
                        {
                            (profile.nativeState || profile.nativeCountry) &&
                            <Grid item md={3}>
                                <Typography variant="h6" color="primary" className="d-flex">
                                    <HomeOutlined className={classes.icon} />
                                    {i18n.t('Native Place')}
                                </Typography>
                                <Typography variant="h6">
                                    {profile.nativeState}{profile.nativeCountry}
                                </Typography>
                            </Grid>
                        }
                </Grid>
            </CardContent>
        </Card>
    );
}

PatientContactDetail.propTypes = {
    profile: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
}

PatientContactDetail.defaultProps = {
    profile: {}
}
