import React from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Typography,
} from '@material-ui/core';
import { EditOutlined, PhoneOutlined, RoomOutlined, HomeOutlined } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

// IMORTING MOCKCHOICES
import { countryChoices } from 'Mockdata/countryChoices.json';
import { stateChoices } from 'Mockdata/stateChoices.json';
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';

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

export default function ContactDetail(props) {
    const classes = useStyles();
    const { i18n } = useTranslation();

    const { profile, handleEdit } = props;
    return (
        <Card className={classes.root} elevation={4}>
            <CardHeader
                title={i18n.t('Contact Details')}
                action={
                    <IconButton variant="contained" className={classes.action} aria-label="settings" onClick={handleEdit}>
                        <EditOutlined fontSize="large"/>
                    </IconButton>
                }
            />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={3} className="pt-0">
                        <Typography variant="h6" color="primary" className="d-flex">
                            <PhoneOutlined className={classes.icon} />
                            {i18n.t('Phone number')}
                        </Typography>
                        <Typography variant="h6">
                            {profile.number} (
                                {
                                    relationshipChoices.map(choice => {
                                        return choice.id === profile.numberBelongsTo ? (choice.name) : ''
                                    })
                                    
                                })
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={(profile.nativeState || profile.nativeCountry) ? 6 : 9} className="pt-0">
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
                            {
                                stateChoices.map(choice => {
                                    return choice.id === profile.state ? (choice.name) : ''
                                })
                            } - {profile.pincode}
                        </Typography>
                    </Grid>
                        {
                            (profile.nativeState || profile.nativeCountry) &&
                            <Grid item xs={12} sm={3} className="pt-0">
                                <Typography variant="h6" color="primary" className="d-flex">
                                    <HomeOutlined className={classes.icon} />
                                    {i18n.t('Native Place')}
                                </Typography>
                                <Typography variant="h6">
                                {
                                    stateChoices.map(choice => {
                                        return choice.id === profile.nativeState ? (choice.name) : ''
                                    })
                                }
                                {
                                    countryChoices.map(choice => {
                                        return choice.id === profile.nativeCountry ? (choice.name) : ''
                                    })
                                }
                                </Typography>
                            </Grid>
                        }
                </Grid>
            </CardContent>
        </Card>
    );
}

ContactDetail.propTypes = {
    profile: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
}

ContactDetail.defaultProps = {
    profile: {}
}
