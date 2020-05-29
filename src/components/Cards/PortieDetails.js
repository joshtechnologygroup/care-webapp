import React from 'react';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Chip,
} from '@material-ui/core';
import { Add, PermContactCalendarOutlined, PhoneOutlined, ChatOutlined } from '@material-ui/icons';
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

// Importing mock data
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';
import CreateUpdatePortieDetails from '../../containers/Patient/createUpdatePortieDetails';

const useStyles = makeStyles(theme =>
  createStyles({
    edit: {
      transform: 'scale(0)',
      transition: '.2s',
      width: 0,
      boxShadow: 'none',
    },
    details: {
      transition: '.4s',
      '&:hover': {
        background: theme.palette.gray.tint,
        '& .MuiFab-root': {
          marginRight: theme.typography.pxToRem(20),
          transform: 'scale(1)',
          width: '40px',
        },
      },
    },
    dateWrap: {
      zIndex: 1,
      position: 'relative',
      '&:before': {
        content: '""',
        position: 'absolute',
        width: '2px',
        height: '100%',
        background: theme.palette.gray.lighter,
        left: '50%',
        zIndex: 0,
        top: 0,
      },
    },
    date: {
      background: theme.palette.gray.lighter,
      color: theme.palette.primary.main,
      position: 'relative',
      zIndex: 1,
      border: 0,
      fontWeight: 'bold'
    },
    action: {
      position: 'absolute',
      right: '.2em',
      top: '.2em',
    },
  })
);

export default function PortieDetails(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { i18n } = useTranslation();
  const belowTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const { profile, handleEdit } = props;
  console.log(profile)
  const [open, setOpen] = React.useState(false);
  const [doctorEditMode, setdoctorEditMode] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({date: '', name: '', email: '', phone:''});
  const editRow = (row) => {
    if (row) {
      setSelectedRow(row);
      setdoctorEditMode(true);
    }
    else {
      setSelectedRow({date: '', name: '', email: '', phone:''});
      setdoctorEditMode(false);
    }
    setOpen(true);
  };
  // Handle modal close
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Card elevation={4}>
      <CardHeader
        title={i18n.t('Portie Details')}
        action={
          <IconButton variant="contained" className={classes.action} aria-label="settings"
            onClick={editRow}
          >
            <Add fontSize="large"/>
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            {
              profile.map((details, index) =>
              <Grid container spacing={4} key={index} className={`mt-10 ${classes.details} ${belowTablet ? 'py-20' : '' }`}>
                <Grid xs={12} sm={3} item className={belowTablet ? 'py-0' : classes.dateWrap }>
                  <Chip variant="outlined" className={classes.date} label={moment.unix(details.dateTime).format("DD-MMM-YYYY HH:MM A")} />
                </Grid>
                <Grid xs={12} sm={9} item className={belowTablet ? 'py-0' : '' }>
                  <Typography className="mt-4" variant="h5" color="primary">{details.status}</Typography>
                  <Typography variant="h6" color="primary" className="mt-5">
                    {i18n.t('Portie Name and Contact')}:
                  </Typography>
                  <Typography variant="h6" className="align-items-center">
                    <PermContactCalendarOutlined className="mr-5" />
                    {details.portieName}
                    <PhoneOutlined className="mr-5 ml-5" />
                    {details.portieContact}
                  </Typography>
                  <Typography variant="h6" color="primary" className="mt-5">
                    {i18n.t('Patient contact')}
                  </Typography>
                  <Typography variant="h6" className="align-items-center">
                    <PhoneOutlined className="mr-5" />
                    {details.patientContact}
                  </Typography>
                  <Typography variant="h6" color="primary" className="mt-5">
                    {i18n.t('Patient relation')}
                  </Typography>
                  <Typography variant="h6" className="align-items-center">
                    <PermContactCalendarOutlined className="mr-5" />
                    {

                      relationshipChoices.map(choice => {
                        return choice.id === details.patientRelation ? (choice.name) : ''
                      })
                    }
                    {
                      Boolean(details.patientRelationContact) &&
                      <>
                        <PhoneOutlined className="ml-5 mr-5" />
                        {details.patientRelationContact}
                      </>
                    }
                  </Typography>
                  <Typography variant="h6" color="primary" className="mt-5">
                    {i18n.t('Comments')}
                  </Typography>
                  <Typography className="d-flex" variant="h6">
                    <ChatOutlined className="mr-5 mt-4" />
                    {details.comments}
                  </Typography>
                </Grid>
                {/* <Fab size="small" color="primary" aria-label="edit" className={classes.edit}>
                  <EditOutlined />
                </Fab> */}
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CreateUpdatePortieDetails details={selectedRow} open={open} onClose={handleClose} />
    </Card>
  );
}

PortieDetails.propTypes = {
  profile: PropTypes.array.isRequired,
  handleEdit: PropTypes.func
}

PortieDetails.defaultProps = {
  profile: []
}
