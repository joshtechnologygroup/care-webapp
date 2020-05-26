import React from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton,
    makeStyles,
    createStyles,
    Tooltip,
} from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import patientMale from 'Assets/images/patient-male.svg';
import patientFemale from 'Assets/images/patient-female.svg';
import { PropTypes } from 'prop-types';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            borderRadius: '0',
            boxShadow: '0.2rem 0.2rem 0.3rem 0.2rem rgba(0, 0, 0, 0.07)',
            position: 'relative',
            marginBottom: '16px'
        },
        input: {
            display: 'none',
        },
        image: {
            background: '#ececec',
            width: '150px',
            height: '150px',
            overflow: 'hidden',
        },
        img: {
            width: '100%'
        },
        imgNull: {
            opacity: .5,
            width: '70%'
        },
        action: {
            position: 'absolute',
            right: 0,
            top: 0
        }
    })
);

export default function PersonalDetail(props) {
    const classes = useStyles();
    const { i18n } = useTranslation();

    const { profile, handleEdit } = props;
    return (
        <Card className={classes.root} elevation={4}>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item className="p-0">
                        <div className={`${classes.image} flex-center`}>
                            <img className={`${classes.img} + ${profile.imageSrc ? '' : classes.imgNull}`} src={profile.imageSrc ? profile.imageSrc : profile.gender === 'Male' ? patientMale: patientFemale} alt={profile.firstName} />
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" color="primary">
                            {profile.firstName} {profile.lastName}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            {i18n.t(profile.gender)}, {profile.ageYears ? profile.ageYears + ' ' + i18n.t('years'): '' } {profile.ageMonths? profile.ageMonths + ' ' + i18n.t('months'): '' }
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            {i18n.t('Govt. ID')}: {profile.idGovt}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            {i18n.t('ICMR ID')}: {profile.idICMR}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            {i18n.t('Cluster group')}: {profile.clusterGroup}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Tooltip title={i18n.t('Edit')}>
                <IconButton className={classes.action} onClick={handleEdit}>
                    <EditOutlined fontSize="large"/>
                </IconButton>
            </Tooltip>
        </Card>
    );
}

PersonalDetail.propTypes = {
    profile: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
}

PersonalDetail.defaultProps = {
    profile: {}
}
