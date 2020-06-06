import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Grid,
  Card,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  Chip,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PhoneOutlined, EmailOutlined, EditOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme =>
  createStyles({
    edit: {
      position: 'absolute',
      top: '50%',
      right: '1.4rem',
      transform: 'translateY(-50%)',
    },
  })
);

export default function DoctorCard(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const { details, editCallback } = props;

  return (
    <Card className="mb-0" elevation={4}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid className="py-0" item xs={12} sm={3}>
            <h4 className="heading--md">
              <Tooltip title={i18n.t('Doctor/Attendant Name')}>
                <span>
                  {details.name}
                </span>
              </Tooltip>
            </h4>
          </Grid>

          <Grid className="py-0" item xs={12} sm={6}>
            <Typography variant="h6" className="align-items-center">
              <PhoneOutlined className="mr-5" />
              {details.phone}
            </Typography>
            <Typography variant="h6" className="align-items-center">
              <EmailOutlined className="mr-5" />
              <Tooltip title={i18n.t('Email')}>
                <span>
                  {details.email}
                </span>
              </Tooltip>
            </Typography>
          </Grid>

          <Grid className="py-0 text-center" item xs={12} sm={2}>
              <span className="heading--sub">{i18n.t('Date attended')}</span>
              <Chip label={moment(details.date).format('DD-MMM-YYYY')} />
          </Grid>

        </Grid>
        {
        editCallback &&
          <Tooltip title={i18n.t('Edit')}>
            <IconButton
              aria-label="edit"
              className={classes.edit}
              onClick={editCallback}
            >
              <EditOutlined fontSize="large"/>
            </IconButton>
          </Tooltip>
        }
      </CardContent>
      <span></span>
    </Card>
  );
}

DoctorCard.propTypes = {
  profile: PropTypes.array.isRequired,
  editCallback: PropTypes.func,
};

DoctorCard.defaultProps = {
  profile: []
};
