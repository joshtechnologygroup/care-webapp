import React from 'react';
import { useTranslation } from "react-i18next";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Fab,
} from '@material-ui/core';
import { PhoneOutlined, EventOutlined, AccessTime, EditOutlined } from '@material-ui/icons';
import { RELATIONSHIP_OPTIONS } from "Src/constants/"
import { EASY_DATE_FORMAT, TIME_FORMAT } from 'Src/constants';

const useStyles = makeStyles(theme =>
  createStyles({
    chip: {
      minWidth: theme.typography.pxToRem(156),
    },
    edit: {
      position: 'absolute',
      right: '0',
      top: '50%',
      transform: 'translate(50%, -50%)',
      boxShadow: 'none',
      [theme.breakpoints.down('sm')]: {
        right: theme.typography.pxToRem(14),
        top: theme.typography.pxToRem(14),
        transform: 'none',
      },
    },
  })
);

export default function PortieDetailCard(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const { details, editCallback } = props;

  return (
    <Card elevation={4} className="mb-10 overflow-visible">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={5}>
            <h6 className="heading--sub">{i18n.t('Contacted by')}</h6>
            <h4 className="heading--md">{details.name}</h4>
            <Typography variant="h6" className="d-flex">
              <PhoneOutlined className="mr-5" />
              {details.portie_phone_number}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <h6 className="heading--sub">{i18n.t('Contacted whom')}</h6>
            <h4 className="heading--md text--gray">{
              RELATIONSHIP_OPTIONS.find(relation => relation.value == details.relation).label
            }</h4>
            <Typography variant="h6" className="d-flex">
              <PhoneOutlined className="mr-5" />
              {details.patient_phone_number}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} md={2} className="ml-md-auto">
            <Chip
              className={`${classes.chip} ${details.able_to_connect ? 'success' : 'danger'}`}
              label={details.able_to_connect ? i18n.t('Contacted') : i18n.t('Not reachable')}
            />
            <Typography variant="h6" className="d-flex mt-5">
              <EventOutlined className="mr-5" />
              {moment(details.called_at).format(EASY_DATE_FORMAT)}
            </Typography>
            <Typography variant="h6" className="d-flex">
              <AccessTime className="mr-5" />
              {moment(details.called_at).format(TIME_FORMAT)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <h6 className="heading--sub">{i18n.t('Comments/Feedback')}</h6>
            <Typography variant="h6" className="d-flex">
              {details.comments ? details.comments : i18n.t('No comments exist')}
            </Typography>
          </Grid>
          {
            editCallback &&
            <Fab
              size="small"
              color="primary"
              aria-label="edit"
              className={classes.edit}
              onClick={() => editCallback(details.id)}
            >
              <EditOutlined />
            </Fab>
          }
        </Grid>
      </CardContent>
    </Card>
  );
}

PortieDetailCard.propTypes = {
  details: PropTypes.object.isRequired,
  editCallback: PropTypes.func,
};

PortieDetailCard.defaultProps = {
  details: {}
};
